export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-[url('/picture/porsche1.jpg')] bg-cover">
      {" "}
      <div className="flex flex-col items-center justify-center lg:w-1/2 py-6 px-6 lg:px-0 rounded-3xl backdrop-blur-lg">
        <h1 className="text-4xl md:text-[40px]">What do you want to create?</h1>
        <p className="text-base mt-6">
          Create something amazing with one simple message.
        </p>

        {/* INPUT BOX */}
        <div className="max-w-xl w-full bg-gray-900 rounded-xl overflow-hidden mt-4">
          <textarea
            className="w-full p-3 pb-0 resize-none outline-none bg-transparent text-white"
            placeholder="Tell us about your idea"
            rows={3}
          />
          <div className="flex items-center justify-between pb-3 px-3">
            <button
              className="flex items-center justify-center bg-gray-500 p-1 rounded-full size-6"
              aria-label="Add"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5h9M5.5 1v9"
                  stroke="#CCD5E2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="flex items-center justify-center p-1 rounded size-6 bg-indigo-600"
              aria-label="Send"
            >
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* FAQ LINKS */}
        <div className="grid grid-cols-2 gap-4 mt-8 text-slate-500">
          <p className="cursor-pointer">
            How do I write a resume or cover letter?
          </p>
          <p className="cursor-pointer">How do I improve my writing skills?</p>
          <div className="w-full h-px bg-gray-400/50"></div>
          <div className="w-full h-px bg-gray-400/50"></div>
          <p className="cursor-pointer">Can you translate something for me?</p>
          <p className="cursor-pointer">How can I be more productive?</p>
        </div>
      </div>
    </div>
  );
}
