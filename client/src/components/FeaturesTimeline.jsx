import React, { useState } from "react";
import {
  RiRocketLine,
  RiShieldLine,
  RiBrainLine,
  RiArrowRightLine,
  RiArrowDownLine,
} from "react-icons/ri";

const TimelineFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      title: "Quick Launch",
      icon: <RiRocketLine className="w-6 h-6" />,
      description: "Get started in minutes with our intuitive setup process",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Launch Features</h3>
          <ul className="space-y-2">
            <li>• One-click installation process</li>
            <li>• Pre-configured templates</li>
            <li>• Guided onboarding flow</li>
            <li>• Instant deployment capabilities</li>
          </ul>
          <p>
            Our streamlined setup ensures you can go from zero to production in
            record time. With automated configuration and intelligent defaults,
            you'll be up and running before you know it.
          </p>
        </div>
      ),
    },
    {
      id: 1,
      title: "Enterprise Security",
      icon: <RiShieldLine className="w-6 h-6" />,
      description: "Bank-grade security with advanced encryption",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Security Features</h3>
          <ul className="space-y-2">
            <li>• End-to-end encryption</li>
            <li>• Multi-factor authentication</li>
            <li>• Role-based access control</li>
            <li>• Regular security audits</li>
          </ul>
          <p>
            Your data security is our top priority. We implement the latest
            security protocols and regular penetration testing to ensure your
            information stays protected.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "AI Integration",
      icon: <RiBrainLine className="w-6 h-6" />,
      description: "Smart automation powered by advanced AI",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">AI Capabilities</h3>
          <ul className="space-y-2">
            <li>• Predictive analytics</li>
            <li>• Automated workflows</li>
            <li>• Smart recommendations</li>
            <li>• Natural language processing</li>
          </ul>
          <p>
            Leverage the power of artificial intelligence to automate tasks,
            gain insights, and make better decisions. Our AI engine learns from
            your data to provide personalized experiences.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Large Screen Layout */}
      <div className="hidden md:grid md:grid-cols-[300px_1fr] gap-8">
        {/* Vertical Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brown-light opacity-20"></div>

          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`relative pl-8 pr-4 py-4 mb-4 cursor-pointer transition-all
                ${
                  activeFeature === index
                    ? "bg-blue-light rounded-lg"
                    : "hover:bg-blue-dark hover:rounded-lg"
                }
              `}
              onClick={() => setActiveFeature(index)}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${
                  activeFeature === index
                    ? "bg-brown-light border-brown-light"
                    : "bg-white border-brown-light border-opacity-40"
                }
              `}
              >
                {activeFeature === index ? (
                  <RiArrowRightLine className="w-4 h-4 text-white" />
                ) : null}
              </div>
              {/* Timeline content */}
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    activeFeature === index
                      ? "bg-blue-dark text-primary-content"
                      : "bg-gray"
                  }`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm opacity-70">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-gray p-8 rounded-lg grid md:grid-cols-2 items-center gap-8">
          {/* GIF Section */}
          <div className="flex justify-center">
            <img
              src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
              alt="Feature GIF"
              className="rounded-lg shadow-lg w-full max-w-sm"
            />
          </div>

          {/* Text Section */}
          <div>{features[activeFeature].content}</div>
        </div>
      </div>

      {/* Small Screen Layout */}
      <div className="md:hidden space-y-20">
        {/* Horizontal Timeline */}
        <div className="relative flex justify-between items-center px-4">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-brown-light opacity-20"></div>

          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="relative z-10"
              onClick={() => setActiveFeature(index)}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer
          ${
            activeFeature === index
              ? "bg-blue-light border-brown-light"
              : "bg-white border-brown-light border-opacity-40"
          }
        `}
              >
                {activeFeature === index ? (
                  <RiArrowDownLine className="w-6 h-6 text-white" />
                ) : (
                  feature.icon
                )}
              </div>
              <div className="absolute w-24 text-center -left-6 mt-2">
                <span className="text-sm font-medium">{feature.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Content Area */}
        <div className="bg-base-200 p-6 rounded-lg flex flex-col items-center space-y-6">
          {/* Text Section */}
          <div className="w-full">{features[activeFeature].content}</div>

          {/* GIF Section */}
          <div className="flex justify-center">
            <img
              src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
              alt="Feature GIF"
              className="rounded-lg shadow-lg w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineFeatures;
