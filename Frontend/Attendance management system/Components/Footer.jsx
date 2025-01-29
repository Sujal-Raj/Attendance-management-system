import React from 'react'

function footer() {
  return (
    <footer className="bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <span className="bg-zinc-900 rounded-full p-2">
              <img src="https://www.zager.in/_next/image?url=%2Flogowhite.png&w=64&q=75" alt="" />
            </span>
          </div>
          <p className="mt-4 text-gray-600">
          It's all about values!
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-x-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Solutions</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><a href="#">Marketing</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Automation</a></li>
            <li><a href="#">Commerce</a></li>
            <li><a href="#">Insights</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Support</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><a href="#">Submit ticket</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Guides</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Company</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">License</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t pt-6 text-center text-gray-500 text-sm">
        © 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default footer