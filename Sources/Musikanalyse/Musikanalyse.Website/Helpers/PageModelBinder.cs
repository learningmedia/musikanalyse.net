namespace Musikanalyse.Website.Helpers
{
    using System;
    using System.Collections.Specialized;
    using System.Linq;
    using System.Web.Mvc;

    using Musikanalyse.Services.Contracts;

    public class PageModelBinder : DefaultModelBinder
    {
        protected override object CreateModel(ControllerContext controllerContext, ModelBindingContext bindingContext, Type modelType)
        {
            NameValueCollection formValues = controllerContext.HttpContext.Request.Form;

            Type type;
            if (formValues.Keys.OfType<string>().Contains("Url"))
            {
                type = typeof(ContentPage);
            }
            else if (formValues.Keys.OfType<string>().Contains("UrlKey"))
            {
                type = typeof(TutorialPage);
            }
            else
            {
                throw new InvalidOperationException("Page type could not be resolved.");
            }

            object model = Activator.CreateInstance(type);
            bindingContext.ModelMetadata = ModelMetadataProviders.Current.GetMetadataForType(( ) => model, type);
            return model;
        }
    }
}