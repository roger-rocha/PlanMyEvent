import {Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text,} from '@react-email/components';
import * as React from 'react';

interface RaycastMagicLinkEmailProps {
  magicLink?: string;
}

export const MagicLinkEmail = ({magicLink}: RaycastMagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Faça login com seu link mágico.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://github.com/roger-rocha/Images/assets/74687838/d2df819e-733d-4fc6-ad2c-4a4d3aa4365f`}
          width={48}
          height={48}
          alt="Raycast"
        />
        <Heading style={heading}>🪄 Seu Link Mágico</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Clique aqui para fazer login 👈
            </Link>
          </Text>
          <Text style={paragraph}>
           Se você não pediu esse email, apenas ignore.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Plan My Event Team
        </Text>
        <Hr style={hr} />
        <Img
          src={`https://github.com/roger-rocha/Images/assets/74687838/d2df819e-733d-4fc6-ad2c-4a4d3aa4365f`}
          width={32}
          height={32}
          style={{
            WebkitFilter: 'grayscale(100%)',
            filter: 'grayscale(100%)',
            margin: '20px 0',
          }}
        />
        <Text style={footer}>Plan My Event Inc.</Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#FF6363',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
