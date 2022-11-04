import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="flex flex-col m-auto w-full max-w-5xl py-16 px-14 text-[#757575] ">
      <div className="text-[16px] mb-8">Questions? Call 0808 196 5391</div>
      <p className="h-0 basis-[100%]"></p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-[13px] ">
        <div className="flex flex-col flex-1 text-left space-y-4">
          <Link className="mb-5 no-underline" href="#">
            FAQ
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Investor Relations
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Ways To Watch
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Coporate Information
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Only on Netflix
          </Link>
        </div>
        <div className="flex flex-col flex-1 text-left space-y-4">
          <Link className="mb-5 no-underline" href="#">
            Help Center
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Jobs
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Terms of Use
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col flex-1 text-left space-y-4">
          <Link className="mb-5 no-underline" href="#">
            Account
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Redeem gift cards
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Privacy
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Speed Test
          </Link>
        </div>
        <div className="flex flex-col flex-1 text-left space-y-4">
          <Link className="mb-5 no-underline" href="#">
            Media Center
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Buy gift cards
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Cookie Preferences
          </Link>
          <Link className="mb-5 no-underline" href="#">
            Legal Notices
          </Link>
        </div>
      </div>
      <p className="h-0 basis-[100%]"></p>
      <div className="text-sm mt-8">Netflix United Kingdom</div>
    </div>
  );
}

export default Footer;
