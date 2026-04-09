'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow Inc.',
    content: 'Working with Gokul was seamless. He transformed our complex requirements into an intuitive, scalable solution that exceeded our expectations. His attention to detail and technical expertise is outstanding.',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'InnovateLabs',
    content: 'Gokul delivered beyond expectations. His clean code architecture and modern UI sense helped us launch our product 2 months ahead of schedule. The user experience is phenomenal.',
    avatar: '/avatars/marcus.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Founder',
    company: 'StartupXYZ',
    content: 'From concept to deployment, Gokul was our technical co-founder. His ability to understand business needs and translate them into elegant solutions is rare. Highly recommended for any startup.',
    avatar: '/avatars/emily.jpg',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Engineering Lead',
    company: 'DataCorp',
    content: 'Gokul\'s expertise in AI integration and full-stack development helped us build a cutting-edge analytics platform. His code is production-ready and his problem-solving skills are exceptional.',
    avatar: '/avatars/david.jpg',
    rating: 5,
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'UX Designer',
    company: 'DesignStudio',
    content: 'Collaborating with Gokul was a pleasure. He has an incredible eye for design and user experience. The final product not only met our design specifications but enhanced them with smart technical solutions.',
    avatar: '/avatars/lisa.jpg',
    rating: 5,
  },
  {
    id: '6',
    name: 'James Park',
    role: 'CEO',
    company: 'NextGen Solutions',
    content: 'Gokul brought our vision to life with precision and creativity. His work on our mobile app and web platform has significantly improved our user engagement and conversion rates.',
    avatar: '/avatars/james.jpg',
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/80"
    >
      {/* Quote Icon */}
      <div className="absolute -top-2 left-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/10">
          <Quote className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          "{testimonial.content}"
        </p>

        {/* Rating */}
        {testimonial.rating && (
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            {/* Placeholder avatar - you can replace with actual images */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {testimonial.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {testimonial.role} at {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CarouselTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-2xl border border-slate-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/90">
        {/* Quote Icon */}
        <div className="absolute -top-3 left-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/10">
            <Quote className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {/* Content */}
        <div className="pt-6">
          <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            "{testimonial.content}"
          </p>

          {/* Rating */}
          {testimonial.rating && (
            <div className="mb-6">
              <StarRating rating={testimonial.rating} />
            </div>
          )}

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {testimonial.name}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <CarouselTestimonialCard
            key={currentIndex}
            testimonial={testimonials[currentIndex]}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevTestimonial}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-xl dark:bg-slate-800/80 dark:hover:bg-slate-800"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>

      <button
        onClick={nextTestimonial}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-xl dark:bg-slate-800/80 dark:hover:bg-slate-800"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>

      {/* Dots Indicator */}
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`h-2 w-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-blue-600 dark:bg-blue-400 w-8'
                : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/30 to-transparent dark:via-slate-900/30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            What People Say
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Real feedback from clients and collaborators who&apos;ve experienced the difference.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 hidden grid-cols-1 gap-8 sm:gap-10 lg:mt-20 lg:max-w-none lg:grid lg:grid-cols-3 xl:block"
        >
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Mobile/Tablet Carousel View */}
        <div className="mt-16 lg:mt-20 xl:hidden">
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  );
}
