import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col ">

      {/* About Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-5xl font-extrabold  mb-8 drop-shadow-lg">
            Welcome to RustE
          </h1>
          <p className="text-xl max-w-3xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
            RustE is your personal notes app designed to help you stay organized and on top of your tasks.
            Whether it's a reminder for your next meeting or a simple to-do list, RustE ensures you never
            miss an important task. With an intuitive interface and seamless experience, RustE makes
            note-taking simple and efficient.
          </p>
        </div>
      </main>

      
    </div>
  );
};

export default HomePage;
