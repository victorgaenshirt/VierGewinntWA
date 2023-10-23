name := """VierGewinntWA"""
organization := "de.htwg.wa.VierGewinnt"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.12"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "6.0.0-RC2" % Test

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "de.htwg.wa.VierGewinnt.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "de.htwg.wa.VierGewinnt.binders._"
