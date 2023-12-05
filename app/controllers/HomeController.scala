package controllers

import akka.actor._
import akka.actor.typed.pubsub.Topic.publish
import com.google.inject.Guice
import de.htwg.se.VierGewinnt.VierGewinntModule
import de.htwg.se.VierGewinnt.controller.controllerComponent.ControllerInterface
import de.htwg.se.VierGewinnt.util.Move
import play.api.mvc._
import akka.stream.Materializer
import de.htwg.se.VierGewinnt.model.playgroundComponent.PlaygroundInterface
import de.htwg.se.VierGewinnt.model.playgroundComponent.playgroundBaseImpl.PlaygroundPvP
import play.api.libs.json.{JsNumber, JsString, Json}
import play.api.libs.streams.ActorFlow

import scala.swing.Reactor
import javax.inject._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents)
                              (implicit system: ActorSystem, mat: Materializer) extends BaseController {

  val NotifiyingController = new NotifiyingController
  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      vierGewinntActor.props(out)
    }
  }

  object vierGewinntActor {
    def props(out: ActorRef) = {
      println("Object created")
      Props(new vierGewinntActor(out))
    }
  }

  class vierGewinntActor(out: ActorRef) extends Actor with Reactor {
    listenTo(NotifiyingController)

    def receive = {
      case msg: String =>
        out ! ("I received your message: " + msg)
        println("Received message " + msg)
    }

    reactions += {
      case event: ChangeNotificationEvent =>
        println("Received event " + event)
        out ! pgToJson(NotifiyingController.controller.playground, NotifiyingController.controller.printState)
    }

  }

  def index(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index(NotifiyingController.controller.playground.grid, NotifiyingController.controller.printState, NotifiyingController.controller.playground.player.head.getName()))
  }

  def newGame(gameType: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.setupGame(gameType, 7)
    Ok(pgToJson(NotifiyingController.controller.playground, NotifiyingController.controller.printState))
  }

  def insert(x: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.doAndPublish(NotifiyingController.controller.insChip, Move(x))
    Ok(pgToJson(NotifiyingController.controller.playground, NotifiyingController.controller.printState))
  }

  def notFound(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotFound(views.html.notFound())
  }

  def badRequest(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    BadRequest(views.html.notFound())
  }

  def gameIntro(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.gameIntro())
  }

  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.save
    Ok("")
  }

  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.load
    Ok(pgToJson(NotifiyingController.controller.playground, NotifiyingController.controller.printState))
  }

  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.doAndPublish(NotifiyingController.controller.undo)
    Ok(pgToJson(NotifiyingController.controller.playground, NotifiyingController.controller.printState))
  }

  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.doAndPublish(NotifiyingController.controller.redo)
    Ok(pgToJson(NotifiyingController.controller.playground, NotifiyingController.controller.printState))
  }

  def winnerChips(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    NotifiyingController.controller.winnerChips match {
      case None => Ok(JsString(""))
      case Some(winningChips) =>
        Ok(Json.obj(
          "values" -> winningChips,
        ))
    }
  }




  private def pgToJson(pg: PlaygroundInterface, state: String) = {
    Json.obj(
      "state" -> JsString(state),
      "playground" -> Json.obj(
        "size" -> JsNumber(pg.size),
        "gameType" -> JsNumber(if (pg.isInstanceOf[PlaygroundPvP]) 0 else 1),
        "currentPlayer" -> Json.obj(
          "name" -> JsString(pg.player(0).getName()),
          "chipColor" -> JsString(pg.player(0).getChip().toString)),
        "otherPlayer" -> Json.obj(
          "name" -> JsString(pg.player(1).getName()),
          "chipColor" -> JsString(pg.player(1).getChip().toString)),
        "cells" -> Json.toJson(
          for {
            row <- 0 until pg.size
            col <- 0 until pg.size
          } yield {
            Json.obj(
              "row" -> row,
              "col" -> col,
              "chip" -> pg.grid.getCell(row, col).chip.toString
            )
          }
        )
      )
    )
  }
}
