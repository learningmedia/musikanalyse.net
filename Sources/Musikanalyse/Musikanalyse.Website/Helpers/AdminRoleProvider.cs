namespace Musikanalyse.Website.Helpers
{
    using System;
    using System.Collections.Specialized;
    using System.Web.Configuration;

    // ReSharper disable ParameterHidesMember

    public sealed class AdminRoleProvider : System.Web.Security.RoleProvider
    {
        private string userName;

        public override void Initialize(string name, NameValueCollection config)
        {
            this.userName = WebConfigurationManager.AppSettings["Membership:userName"];
            base.Initialize(name, config);
        }

        public override bool IsUserInRole(string userName, string roleName)
        {
            return this.userName.Equals(userName, StringComparison.Ordinal) && roleName.Equals("Administrator", StringComparison.Ordinal);
        }

        public override string[] GetRolesForUser(string userName)
        {
            return this.userName.Equals(userName, StringComparison.Ordinal) ? new[] { "Administrator" } : new string[0];
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

        public override void AddUsersToRoles(string[] userNames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] userNames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string userNameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }
    }

    // ReSharper restore ParameterHidesMember
}