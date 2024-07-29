import React, { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

// Define the props interface
interface DataCardProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle: string;
  footerLink: string;
  footerLinkText: string;
  children: ReactNode; // Add children prop for direct content
}

const DataCard: React.FC<DataCardProps> = ({
  logoSrc,
  logoAlt,
  title,
  subtitle,
  footerLink,
  footerLinkText,
  children, // Destructure children prop
}) => {
  return (
    <Card className="">
      <CardHeader className="flex gap-3">
        <Image alt={logoAlt} height={40} radius="sm" src={logoSrc} width={40} />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{subtitle}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>{children}</CardBody> {/* Use children prop here */}
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={footerLink}>
          {footerLinkText}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DataCard;
