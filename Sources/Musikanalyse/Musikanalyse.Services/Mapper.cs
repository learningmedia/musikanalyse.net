namespace Musikanalyse.Services
{
    using System;

    using Musikanalyse.DataAccess;

    public static class Mapper
    {
        static Mapper()
        {
            AutoMapper.Mapper.CreateMap<DataAccess.ContentPage, Contracts.ContentPage>();
            AutoMapper.Mapper.CreateMap<Contracts.ContentPage, DataAccess.ContentPage>();
            AutoMapper.Mapper.CreateMap<DataAccess.TutorialPage, Contracts.TutorialPage>();
            AutoMapper.Mapper.CreateMap<Contracts.TutorialPage, DataAccess.TutorialPage>();
        }

        public static Contracts.Page MapToContract(DataAccess.Page pageEntity)
        {
            if (pageEntity == null)
            {
                throw new ArgumentNullException("pageEntity");
            }

            DataAccess.ContentPage contentPage = pageEntity as DataAccess.ContentPage;
            if (contentPage != null)
            {
                return MapToContract(contentPage);
            }

            DataAccess.TutorialPage tutorialPage = pageEntity as DataAccess.TutorialPage;
            if (tutorialPage != null)
            {
                return MapToContract(tutorialPage);
            }

            throw new NotImplementedException();
        }

        public static Contracts.TutorialPage MapToContract(DataAccess.TutorialPage pageEntity)
        {
            if (pageEntity == null)
            {
                throw new ArgumentNullException("pageEntity");
            }

            return AutoMapper.Mapper.Map<Contracts.TutorialPage>(pageEntity);
        }

        public static Contracts.ContentPage MapToContract(DataAccess.ContentPage pageEntity)
        {
            if (pageEntity == null)
            {
                throw new ArgumentNullException("pageEntity");
            }

            return AutoMapper.Mapper.Map<Contracts.ContentPage>(pageEntity);
        }

        public static Page MapToEntity(Contracts.Page pageContract)
        {
            if (pageContract == null)
            {
                throw new ArgumentNullException("pageContract");
            }

            Contracts.ContentPage contentPage = pageContract as Contracts.ContentPage;
            if (contentPage != null)
            {
                return MapToEntity(contentPage);
            }

            Contracts.TutorialPage tutorialPage = pageContract as Contracts.TutorialPage;
            if (tutorialPage != null)
            {
                return MapToEntity(tutorialPage);
            }

            throw new NotImplementedException();
        }

        public static TutorialPage MapToEntity(Contracts.TutorialPage pageContract)
        {
            if (pageContract == null)
            {
                throw new ArgumentNullException("pageContract");
            }

            return AutoMapper.Mapper.Map<TutorialPage>(pageContract);
        }

        public static ContentPage MapToEntity(Contracts.ContentPage pageContract)
        {
            if (pageContract == null)
            {
                throw new ArgumentNullException("pageContract");
            }

            return AutoMapper.Mapper.Map<ContentPage>(pageContract);
        }

        public static void MapToExistingEntity(Contracts.Page pageContract, Page pageEntity)
        {
            if (pageContract == null)
            {
                throw new ArgumentNullException("pageContract");
            }

            if (pageEntity == null)
            {
                throw new ArgumentNullException("pageEntity");
            }

            Contracts.ContentPage contentPageContract = pageContract as Contracts.ContentPage;
            DataAccess.ContentPage contentPageEntity = pageEntity as DataAccess.ContentPage;
            if (contentPageContract != null && contentPageEntity != null)
            {
                MapToExistingEntity(contentPageContract, contentPageEntity);
                return;
            }

            Contracts.TutorialPage tutorialPageContract = pageContract as Contracts.TutorialPage;
            DataAccess.TutorialPage tutorialPageEntity = pageEntity as DataAccess.TutorialPage;
            if (tutorialPageContract != null && tutorialPageEntity != null)
            {
                MapToExistingEntity(tutorialPageContract, tutorialPageEntity);
                return;
            }

            throw new NotImplementedException();
        }

        public static void MapToExistingEntity(Contracts.ContentPage pageContract, ContentPage pageEntity)
        {
            if (pageContract == null)
            {
                throw new ArgumentNullException("pageContract");
            }

            if (pageEntity == null)
            {
                throw new ArgumentNullException("pageEntity");
            }

            AutoMapper.Mapper.Map(pageContract, pageEntity);
        }

        public static void MapToExistingEntity(Contracts.TutorialPage pageContract, TutorialPage pageEntity)
        {
            if (pageContract == null)
            {
                throw new ArgumentNullException("pageContract");
            }

            if (pageEntity == null)
            {
                throw new ArgumentNullException("pageEntity");
            }

            AutoMapper.Mapper.Map(pageContract, pageEntity);
        }
    }
}