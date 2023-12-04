name := """VierGewinntWA"""
organization := "de.htwg.wa.VierGewinnt"

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .settings(Seq(npmSrcDir := "VierGewinntAI"))
  .enablePlugins(PlayScala)

scalaVersion := "2.13.12"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "6.0.0-RC2" % Test

scalacOptions += "-Ytasty-reader"
