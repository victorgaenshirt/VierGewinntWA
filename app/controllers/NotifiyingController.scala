package controllers

import com.google.inject.Guice
import de.htwg.se.VierGewinnt.VierGewinntModule
import de.htwg.se.VierGewinnt.controller.controllerComponent.ControllerInterface
import play.api.mvc.BaseController

import scala.swing.Publisher
import scala.swing.event.Event


case class ChangeNotificationEvent() extends Event

class NotifiyingController extends Publisher {
  private val injector = Guice.createInjector(new VierGewinntModule)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])
  def notifyChange(): Unit = publish(ChangeNotificationEvent())
}
