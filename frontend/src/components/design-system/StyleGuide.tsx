import React from 'react';
import { UdemButton } from '../ui/udem-button';
import { UdemCard, UdemCardHeader, UdemCardContent } from '../ui/udem-card';
import { UdemBadge } from '../ui/udem-badge';
import { UdemIconContainer } from '../ui/udem-icon-container';
import { Users, BookOpen, Calendar, Heart } from 'lucide-react';

/**
 * StyleGuide Component
 * 
 * Visual reference for the MontrealCampus Connect design system.
 * Use this component to preview all design system components and patterns.
 * 
 * @example
 * // To view the style guide in development:
 * import { StyleGuide } from '@/components/design-system/StyleGuide';
 * 
 * function App() {
 *   return <StyleGuide />;
 * }
 */
export function StyleGuide() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4">
            <span className="bg-gradient-to-r from-[#0055A4] to-[#ED2939] bg-clip-text text-transparent">
              MontrealCampus Connect
            </span>
          </h1>
          <h2>Design System Style Guide</h2>
          <p className="text-muted-foreground mt-2">
            Visual reference for consistent component usage
          </p>
        </div>

        {/* Colors */}
        <section>
          <h2 className="mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-[#0055A4] rounded-xl mb-2" />
              <p className="text-sm">UdeM Blue</p>
              <code className="text-xs text-muted-foreground">#0055A4</code>
            </div>
            <div>
              <div className="h-24 bg-[#ED2939] rounded-xl mb-2" />
              <p className="text-sm">UdeM Red</p>
              <code className="text-xs text-muted-foreground">#ED2939</code>
            </div>
            <div>
              <div className="h-24 bg-[#E6F0F9] rounded-xl mb-2" />
              <p className="text-sm">Blue Light</p>
              <code className="text-xs text-muted-foreground">#E6F0F9</code>
            </div>
            <div>
              <div className="h-24 bg-[#FCE8EB] rounded-xl mb-2" />
              <p className="text-sm">Red Light</p>
              <code className="text-xs text-muted-foreground">#FCE8EB</code>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-6">Buttons</h2>
          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <UdemButton variant="primary">Primary</UdemButton>
                <UdemButton variant="secondary">Secondary</UdemButton>
                <UdemButton variant="outline">Outline</UdemButton>
                <UdemButton variant="ghost">Ghost</UdemButton>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <UdemButton variant="primary" size="sm">Small</UdemButton>
                <UdemButton variant="primary" size="md">Medium</UdemButton>
                <UdemButton variant="primary" size="lg">Large</UdemButton>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <UdemButton variant="primary">
                  <Users className="w-5 h-5 mr-2" />
                  With Icon
                </UdemButton>
                <UdemButton variant="secondary">
                  <Heart className="w-5 h-5 mr-2" />
                  Favorite
                </UdemButton>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Card */}
            <UdemCard>
              <UdemCardHeader>
                <h3>Default Card</h3>
              </UdemCardHeader>
              <UdemCardContent>
                <p className="text-muted-foreground">
                  Standard card with white background and subtle shadow.
                </p>
              </UdemCardContent>
            </UdemCard>

            {/* Hover Card */}
            <UdemCard hover>
              <UdemCardHeader>
                <h3>Hover Card</h3>
              </UdemCardHeader>
              <UdemCardContent>
                <p className="text-muted-foreground">
                  Card with hover effect. Shadow increases on hover.
                </p>
              </UdemCardContent>
            </UdemCard>

            {/* Blue Variant */}
            <UdemCard variant="blue">
              <UdemCardHeader>
                <h3>Blue Card</h3>
              </UdemCardHeader>
              <UdemCardContent>
                <p className="text-muted-foreground">
                  Card with light blue background accent.
                </p>
              </UdemCardContent>
            </UdemCard>

            {/* Red Variant */}
            <UdemCard variant="red">
              <UdemCardHeader>
                <h3>Red Card</h3>
              </UdemCardHeader>
              <UdemCardContent>
                <p className="text-muted-foreground">
                  Card with light red background accent.
                </p>
              </UdemCardContent>
            </UdemCard>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="mb-6">Badges</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-4">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <UdemBadge variant="blue">French</UdemBadge>
                <UdemBadge variant="red">Popular</UdemBadge>
                <UdemBadge variant="gradient">Featured</UdemBadge>
                <UdemBadge variant="neutral">General</UdemBadge>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <UdemBadge size="sm">Small</UdemBadge>
                <UdemBadge size="md">Medium</UdemBadge>
                <UdemBadge size="lg">Large</UdemBadge>
              </div>
            </div>
          </div>
        </section>

        {/* Icon Containers */}
        <section>
          <h2 className="mb-6">Icon Containers</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <UdemIconContainer variant="blue">
                  <Users className="w-6 h-6 text-[#0055A4]" />
                </UdemIconContainer>
                <UdemIconContainer variant="red">
                  <BookOpen className="w-6 h-6 text-[#ED2939]" />
                </UdemIconContainer>
                <UdemIconContainer variant="gradient">
                  <Calendar className="w-6 h-6 text-white" />
                </UdemIconContainer>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Sizes</h3>
              <div className="flex flex-wrap items-end gap-4">
                <UdemIconContainer variant="blue" size="sm">
                  <Users className="w-4 h-4 text-[#0055A4]" />
                </UdemIconContainer>
                <UdemIconContainer variant="blue" size="md">
                  <Users className="w-6 h-6 text-[#0055A4]" />
                </UdemIconContainer>
                <UdemIconContainer variant="blue" size="lg">
                  <Users className="w-8 h-8 text-[#0055A4]" />
                </UdemIconContainer>
                <UdemIconContainer variant="blue" size="xl">
                  <Users className="w-10 h-10 text-[#0055A4]" />
                </UdemIconContainer>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Shapes</h3>
              <div className="flex flex-wrap gap-4">
                <UdemIconContainer variant="blue" rounded="square">
                  <Users className="w-6 h-6 text-[#0055A4]" />
                </UdemIconContainer>
                <UdemIconContainer variant="blue" rounded="rounded">
                  <Users className="w-6 h-6 text-[#0055A4]" />
                </UdemIconContainer>
                <UdemIconContainer variant="blue" rounded="circle">
                  <Users className="w-6 h-6 text-[#0055A4]" />
                </UdemIconContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="mb-6">Typography</h2>
          <UdemCard className="p-6 space-y-4">
            <div>
              <h1>Heading 1 - Default Styling</h1>
              <code className="text-xs text-muted-foreground">{'<h1>'}</code>
            </div>
            <div>
              <h2>Heading 2 - Default Styling</h2>
              <code className="text-xs text-muted-foreground">{'<h2>'}</code>
            </div>
            <div>
              <h3>Heading 3 - Default Styling</h3>
              <code className="text-xs text-muted-foreground">{'<h3>'}</code>
            </div>
            <div>
              <h4>Heading 4 - Default Styling</h4>
              <code className="text-xs text-muted-foreground">{'<h4>'}</code>
            </div>
            <div>
              <p>
                Paragraph text with default styling. This is how body text appears
                throughout the application with proper line height and spacing.
              </p>
              <code className="text-xs text-muted-foreground">{'<p>'}</code>
            </div>
          </UdemCard>
        </section>

        {/* Example Composition */}
        <section>
          <h2 className="mb-6">Example Composition</h2>
          <UdemCard hover interactive className="p-6">
            <div className="flex items-start gap-4">
              <UdemIconContainer variant="gradient" size="lg">
                <Users className="w-8 h-8 text-white" />
              </UdemIconContainer>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3>Language Exchange Event</h3>
                  <UdemBadge variant="red">Popular</UdemBadge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Join our weekly language exchange meetup. Practice French, English,
                  and Spanish with native speakers in a casual setting.
                </p>
                <div className="flex gap-2">
                  <UdemButton variant="primary" size="sm">
                    Join Event
                  </UdemButton>
                  <UdemButton variant="outline" size="sm">
                    Learn More
                  </UdemButton>
                </div>
              </div>
            </div>
          </UdemCard>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>MontrealCampus Connect Design System</p>
          <p>Université de Montréal</p>
        </div>
      </div>
    </div>
  );
}
