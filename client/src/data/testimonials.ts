export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Kwame Mensah',
    role: 'Barber',
    company: 'Sharp Cuts',
    quote:
      'Very professional and fast delivery. My shop now looks premium online and customers trust my brand more. The WhatsApp booking feature alone has brought in more clients.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1578376026533-4e5e1bf14824?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Ama Boateng',
    role: 'Business Owner',
    company: 'Lusso Homes',
    quote:
      'The website completely changed how clients see my business. Clean, modern and effective. Listowell understood exactly what I needed and delivered beyond expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1589156206699-bc21e38c8ee5?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Kofi Asare',
    role: 'Fashion Seller',
    company: 'Suit Up',
    quote:
      'I love the design. It makes my brand look international and serious. The mobile experience is smooth and customers can browse my collection easily.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Daniel Owusu',
    role: 'Entrepreneur',
    company: 'Online Store',
    quote:
      'Working with Lisgraphix was smooth and professional. Highly recommend his services. The attention to detail and quick turnaround time impressed me.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=200&h=200&fit=crop&crop=face',
  },
];
