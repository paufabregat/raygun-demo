import play.api._
import play.api.mvc._
import play.api.mvc.Results._

import com.mindscapehq.raygun4java.play2.RaygunPlayClient;

object Global extends GlobalSettings {
  override def onError(request: RequestHeader, ex: Throwable) = {
    val rg = new RaygunPlayClient("your-api-key", request)
    val result = rg.SendAsync(ex)

    super.onError(request, ex)
  }
}
