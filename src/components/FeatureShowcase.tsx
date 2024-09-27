// components/FeatureShowcase.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "./ui/button";

interface Feature {
  title: string;
  description: string;
  content: string;
  image: string;
  route: string;
}

interface FeatureShowcaseProps {
  features: Feature[];
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ features }) => {
  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
        >
          <div className="relative w-full h-48 md:h-56 lg:h-64">
            <Image
              src={feature.image}
              alt={feature.title}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <p className="text-gray-400 mb-4">{feature.content}</p>
            </div>
            <Link href={feature.route} className="mt-auto">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Try Now
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default FeatureShowcase;