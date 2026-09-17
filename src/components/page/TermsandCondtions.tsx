const TermsandCondtions = () => {
  return (
    <div className="mt-[70px] mx-auto max-w-7xl px-5 tab:px-[42px] lg:px-6">
      <div className="items-start">
        <div className="flex gap-[12px] items-center">
          <TermsandCondition />
          <h1 className="font-bold lg:text-3xl mb:text-[26px] text-lg  text-[#000000]">
            Terms of Use
          </h1>
        </div>
      </div>
      <div className="mt-[60px] font-medium lg:text-lg mb:text-base text-sm flex flex-col gap-5 mb:px-5">
        <ul className="list-disc space-y-5 px-5 mb:px-6 lg:px-6">
          <li>
          Liability limited by a scheme approved under Professional Standards Legislation.
          </li>
          <li>
          Legal practitioners employed by Paul & Paul Lawyers Pty Ltd ABN{" "}
          <span className="font-bold">
            28 636 188 568
          </span>{" "}are members of the scheme.
          </li>
          <li>
          The use of this website and its content is subject to the following terms, which may not be excluded.
          </li>
          <li>
          The information that is provided on this website is provided as a summary only and we give no warranty about its truth or accuracy.
          </li>
          <li>This website is not intended to convey any legal or professional advice or create any solicitor-client relationship.</li>
          <li>We do not control the content of the external sites which are referred to by any hypertext links on this website and we do not mean to imply we endorse any such content or have a relationship with any organisations that operate or are referred to in those external sites.</li>
          <li>Your use of, or reliance upon, the material contained in this website is entirely at your own risk and we shall not be liable for any loss or damage arising from or in connection with, or relating to, any such use or reliance.</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsandCondtions;

const TermsandCondition = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="50"
    viewBox="0 0 48 50"
    fill="none"
  >
    <path d="M0 0H24H33.9574L40.8511 7L48 14.5V25V50H0V0Z" fill="#A9ABAD" />
    <path
      d="M27.1 30H11.9C10.8613 30 10 29.0933 10 28C10 26.9067 10.8613 26 11.9 26H27.1C28.1387 26 29 26.9067 29 28C29 29.0933 28.1387 30 27.1 30Z"
      fill="#292D32"
    />
    <path
      d="M22.0909 40H11.9091C10.8655 40 10 39.0933 10 38C10 36.9067 10.8655 36 11.9091 36H22.0909C23.1345 36 24 36.9067 24 38C24 39.0933 23.1345 40 22.0909 40Z"
      fill="#292D32"
    />
  </svg>
);
