import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ThemedContentCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  theme?: 'doraemon' | 'default' | string; // Allow custom string for more themes
  children?: React.ReactNode; // For custom content inside the card
  footerContent?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ThemedContentCard: React.FC<ThemedContentCardProps> = ({
  title,
  description,
  imageUrl,
  theme = 'default',
  children,
  footerContent,
  onClick,
  className,
}) => {
  console.log("Rendering ThemedContentCard with title:", title, "and theme:", theme);

  const themeClasses = {
    default: {
      bg: 'bg-card',
      text: 'text-card-foreground',
      border: '',
    },
    doraemon: {
      bg: 'bg-blue-400', // Doraemon blue
      text: 'text-yellow-300', // Doraemon yellow for text, or white for better contrast
      border: 'border-yellow-400', // Doraemon yellow border
      titleText: 'text-white',
      descriptionText: 'text-blue-100',
    },
    // Add more themes here
  };

  // Resolve theme: if theme is a string not in themeClasses, use default.
  const currentThemeConfig = themeClasses[theme as keyof typeof themeClasses] || themeClasses.default;

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-lg',
        currentThemeConfig.bg,
        currentThemeConfig.border,
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        </div>
      )}
      <CardHeader>
        <CardTitle className={cn(currentThemeConfig.titleText || currentThemeConfig.text)}>{title}</CardTitle>
        {description && <CardDescription className={cn(currentThemeConfig.descriptionText || 'text-muted-foreground', currentThemeConfig.text === 'text-yellow-300' ? 'text-blue-100' : '')}>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent className={cn(currentThemeConfig.text)}>{children}</CardContent>}
      {footerContent && <CardFooter className={cn(currentThemeConfig.text)}>{footerContent}</CardFooter>}
    </Card>
  );
};

export default ThemedContentCard;