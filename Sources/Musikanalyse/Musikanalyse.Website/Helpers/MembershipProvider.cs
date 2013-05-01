namespace Musikanalyse.Website.Helpers
{
    using System;
    using System.Collections.Specialized;
    using System.Threading;
    using System.Web.Configuration;
    using System.Web.Security;

    // ReSharper disable ParameterHidesMember

    public sealed class MembershipProvider : System.Web.Security.MembershipProvider
    {
        private static readonly object lockObject = new object();

        private const int throttleIncrementMilliseconds = 1000;

        private const int maxThrottleMilliseconds = 60000;

        private static readonly TimeSpan maxInvalidLoginWindow = TimeSpan.FromMinutes(60D);

        private static DateTime lastInvalidLoginAttempt = DateTime.MinValue;

        private static int invalidLoginsInWindow;

        private string userName;

        private string password;

        public override void Initialize(string name, NameValueCollection config)
        {
            this.userName = WebConfigurationManager.AppSettings["Membership:userName"];
            this.password = WebConfigurationManager.AppSettings["Membership:Password"];
            base.Initialize(name, config);
        }

        public override MembershipUser CreateUser(
            string userName,
            string password,
            string email,
            string passwordQuestion,
            string passwordAnswer,
            bool isApproved,
            object providerUserKey,
            out MembershipCreateStatus status)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePasswordQuestionAndAnswer(string userName, string password, string newPasswordQuestion, string newPasswordAnswer)
        {
            throw new NotImplementedException();
        }

        public override string GetPassword(string userName, string answer)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePassword(string userName, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public override string ResetPassword(string userName, string answer)
        {
            throw new NotImplementedException();
        }

        public override void UpdateUser(MembershipUser user)
        {
            throw new NotImplementedException();
        }

        public override bool ValidateUser(string userName, string password)
        {
            if (this.userName.Equals(userName, StringComparison.Ordinal) && this.password.Equals(password, StringComparison.Ordinal))
            {
                return true;
            }

            int millisecondsToWait;
            lock (lockObject)
            {
                if (DateTime.UtcNow - lastInvalidLoginAttempt > maxInvalidLoginWindow)
                {
                    invalidLoginsInWindow = 0;
                }

                invalidLoginsInWindow++;
                lastInvalidLoginAttempt = DateTime.UtcNow;
                millisecondsToWait = Math.Min(invalidLoginsInWindow * throttleIncrementMilliseconds, maxThrottleMilliseconds);
            }

            Thread.Sleep(millisecondsToWait);
            return false;
        }

        public override bool UnlockUser(string userName)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(string userName, bool userIsOnline)
        {
            if (this.userName.Equals(userName, StringComparison.Ordinal))
            {
                return new MembershipUser(
                    this.Name,
                    userName,
                    null,
                    null,
                    null,
                    null,
                    true,
                    false,
                    DateTime.MinValue,
                    DateTime.MinValue,
                    DateTime.UtcNow,
                    DateTime.MinValue,
                    DateTime.MinValue);
            }

            throw new InvalidOperationException("User " + userName + " does not exist.");
        }

        public override string GetUserNameByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteUser(string userName, bool deleteAllRelatedData)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override int GetNumberOfUsersOnline()
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByName(string userNameToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override bool EnablePasswordRetrieval
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool EnablePasswordReset
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool RequiresQuestionAndAnswer
        {
            get
            {
                throw new NotImplementedException();
            }
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

        public override int MaxInvalidPasswordAttempts
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int PasswordAttemptWindow
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override bool RequiresUniqueEmail
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override MembershipPasswordFormat PasswordFormat
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int MinRequiredPasswordLength
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override int MinRequiredNonAlphanumericCharacters
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override string PasswordStrengthRegularExpression
        {
            get
            {
                throw new NotImplementedException();
            }
        }
    }

    // ReSharper restore ParameterHidesMember
}