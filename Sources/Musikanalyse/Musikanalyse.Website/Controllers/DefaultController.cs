using System.Web.Mvc;

namespace Musikanalyse.Website.Controllers
{
    using System;
    using System.Web;
    using System.Web.ModelBinding;
    using System.Web.Security;

    using Musikanalyse.Services;
    using Musikanalyse.Services.Contracts;
    using Musikanalyse.Website.ViewModels;

    public class DefaultController : Controller
    {
        private readonly IPageService pageService;

        public DefaultController() : this(new PageService())
        {
        }

        public DefaultController(IPageService pageService)
        {
            this.pageService = pageService;
        }

        public ActionResult Login()
        {
            return this.View(new LoginViewModel());
        }

        [HttpPost]
        public ActionResult Login(LoginViewModel model, [QueryString("ReturnUrl")] string returnUrl)
        {
            if (!this.ModelState.IsValid)
            {
                return this.View(model);
            }

            if (!Membership.ValidateUser(model.UserName, model.Password))
            {
                this.ModelState.AddModelError("Password", "Das angegebene Kennwort ist ungültig.");
                return this.View(model);
            }

            FormsAuthentication.SetAuthCookie(model.UserName, false);
            string url = returnUrl ?? FormsAuthentication.DefaultUrl;
            return this.Redirect(url);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return this.Redirect(FormsAuthentication.DefaultUrl);
        }

        public ActionResult Index()
        {
            TutorialsViewModel model = new TutorialsViewModel();
            model.TutorialInfos = this.pageService.GetRandomTutorials(4);

            return this.View(model);
        }

        public ActionResult TutorialPage(string urlKey)
        {
            try
            {
                TutorialPage tutorialPage = this.pageService.GetTutorialPage(urlKey);
                return View(tutorialPage);
            }
            catch (Exception)
            {
                throw new HttpException(404, "Page not found.");
            }
        }

        public ActionResult TutorialIndex()
        {
            try
            {
                TutorialsViewModel model = new TutorialsViewModel();
                model.TutorialInfos = this.pageService.GetAllTutorialInfos();

                return this.View(model);
            }
            catch (Exception)
            {
                throw new HttpException(404, "Page not found.");
            }
        }

        public ActionResult ContentPage(string url)
        {
            try
            {
                ContentPage contentPage = this.pageService.GetContentPage(url);
                return View(contentPage);
            }
            catch (Exception e)
            {
                throw new HttpException(404, "Page not found.");
            }
        }
    }
}
