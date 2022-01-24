using System;
using System.Collections.Generic;
using System.Text;

namespace RetroArcadeMachines.Services.Write.Models
{
    public class UpdateResultModel
    {
        public bool IsUpdated { get; private set; }
        public IEnumerable<string> Errors { get; private set; }

        public UpdateResultModel(bool isUpdated)
        {
            SetFields(isUpdated, null);
        }

        public UpdateResultModel(bool isUpdated, IEnumerable<string> errors)
        {
            SetFields(isUpdated, errors);
        }

        protected virtual void SetFields(bool isUpdated, IEnumerable<string> errors)
        {
            IsUpdated = isUpdated;
            Errors = errors;
        }
    }
}
