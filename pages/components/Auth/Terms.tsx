import React from "react";

type TermsProps = {};

const Terms: React.FC<TermsProps> = () => {
  return (
    <div>
      <div className="px-5 py-1 text-xs">
        <p className="">
          People who use our service may have uploaded your contact information
          to Facebook. Learn more.
        </p>
        <br />
        <p className="">
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You may receive SMS Notifications from us and can opt
          out any time.
        </p>
      </div>
    </div>
  );
};
export default Terms;
