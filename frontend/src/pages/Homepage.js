import React from 'react'
import NavBar from '../components/Navbar'

const HomePage = () => {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <NavBar />
  
        {/* About Section */}
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to RustE</h1>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
              RustE is your personal notes app designed to help you stay organized and on top of your tasks. 
              Whether it's a reminder for your next meeting or a simple to-do list, RustE ensures you never 
              miss an important task. With an intuitive interface and seamless experience, RustE makes note-taking 
              simple and efficient.
            </p>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} RustE. All rights reserved.
          </div>
        </footer>
      </div>
    );
  };
  
  export default HomePage;
