package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import com.mindscapehq.raygun4java.play2.RaygunPlayClient;
/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class ErrorController @Inject() extends Controller {

  def error = Action {
    throw new Exception("From Scala")
    Ok("Exception throw")
  }

  def index = Action { implicit request =>
    val rg = new RaygunPlayClient("ZX4uKjL2w+mBuaeAJNBVCQ==", request)
    val result = rg.Send(new Exception("From Scala"))

    Ok("Send exception directly")
  }

}
