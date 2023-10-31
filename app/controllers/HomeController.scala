package controllers

import com.google.inject.Guice
import de.htwg.se.VierGewinnt.VierGewinntModule
import de.htwg.se.VierGewinnt.controller.controllerComponent.ControllerInterface
import de.htwg.se.VierGewinnt.util.Move
import play.api._
import play.api.mvc._

import javax.inject._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  val injector = Guice.createInjector(new VierGewinntModule)
  val controller = injector.getInstance(classOf[ControllerInterface])

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index(controller.playground.grid, controller.printState, controller.playground.player.head.getName()))
  }

  def newGame(gameType: Int) = Action { implicit request: Request[AnyContent] =>
    controller.setupGame(gameType, 7)
    Ok(views.html.index(controller.playground.grid, controller.printState, controller.playground.player.head.getName()))
  }

  def insert(x: Int) = Action { implicit request: Request[AnyContent] =>
    controller.doAndPublish(controller.insChip, Move(x))
    Ok(views.html.index(controller.playground.grid, controller.printState, controller.playground.player.head.getName()))
  }

  def notFound() = Action { implicit request: Request[AnyContent] =>
    NotFound(views.html.notFound())
  }

  def badRequest() = Action { implicit request: Request[AnyContent] =>
    BadRequest(views.html.notFound())
  }

  def gameIntro() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.gameIntro())
  }
}
