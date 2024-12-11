import React, { useState } from "react";
import {
  FaUsers,
  FaBrain,
  FaChartLine,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";
import Community from "../assets/community.jpg";
import Coach from "../assets/coach.png";
import Progress from "../assets/progress.jpg";

const TimelineFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      title: "Community Support",
      icon: <FaUsers className="w-6 h-6" />,
      description: "Connect with like-minded learners",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Community Engagement</h3>
          <p>
            Join a vibrant community of learners who support and motivate each
            other. Participate in various learning activities and collaborate
            with peers.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="max-w-md">
              <img
                src={Community}
                alt="Community collaboration"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "AI Coach",
      icon: <FaBrain className="w-6 h-6" />,
      description: "Personalized AI-powered guidance",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Learning Progress</h3>
          <p>
            Track your improvement with our AI coach. Get personalized
            recommendations and see your performance improve over time.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="max-w-md">
              <img
                src={Coach}
                alt="AI coaching interface"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Progress Tracking",
      icon: <FaChartLine className="w-6 h-6" />,
      description: "Monitor your learning journey",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Skill Progress</h3>
          <p>
            Monitor your progress across different skills and technologies. Set
            goals and track your achievements.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="max-w-md">
              <img
                src={Progress}
                alt="Progress dashboard"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Rest of the component remains the same */}
      <div className="hidden md:grid md:grid-cols-[300px_1fr] gap-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`relative pl-8 pr-4 py-4 mb-4 cursor-pointer transition-all
                ${
                  activeFeature === index
                    ? "bg-blue-50 rounded-lg"
                    : "hover:bg-gray-50 hover:rounded-lg"
                }
              `}
              onClick={() => setActiveFeature(index)}
            >
              <div
                className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center
                  ${
                    activeFeature === index
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300"
                  }
                `}
              >
                {activeFeature === index ? (
                  <FaArrowRight className="w-4 h-4 text-white" />
                ) : null}
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    activeFeature === index
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100"
                  }`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          {features[activeFeature].content}
        </div>
      </div>

      <div className="md:hidden space-y-16">
        <div className="relative flex justify-between items-center px-4">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200"></div>

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
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300"
                  }
                `}
              >
                {activeFeature === index ? (
                  <FaArrowDown className="w-6 h-6 text-white" />
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

        <div className="bg-white p-6 rounded-lg shadow-sm">
          {features[activeFeature].content}
        </div>
      </div>
    </div>
  );
};

export default TimelineFeatures;
