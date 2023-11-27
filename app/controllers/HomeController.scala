package controllers

import com.google.inject.Guice
import de.htwg.se.VierGewinnt.VierGewinntModule
import de.htwg.se.VierGewinnt.controller.controllerComponent.ControllerInterface
import de.htwg.se.VierGewinnt.model.playgroundComponent.PlaygroundInterface
import de.htwg.se.VierGewinnt.model.playgroundComponent.playgroundBaseImpl.PlaygroundPvP
import de.htwg.se.VierGewinnt.util.Move
import play.api.libs.json.{JsNumber, JsString, Json}
import play.api.mvc._

import javax.inject._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val injector = Guice.createInjector(new VierGewinntModule)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  def index(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index(controller.playground.grid, controller.printState, controller.playground.player.head.getName()))
  }

  def newGame(gameType: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.setupGame(gameType, 7)
    Ok(pgToJson(controller.playground, controller.printState))
  }

  def insert(x: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.doAndPublish(controller.insChip, Move(x))
    Ok(pgToJson(controller.playground, controller.printState))
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
    controller.save
    Ok("")
  }

  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.load
    Ok(pgToJson(controller.playground, controller.printState))
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
