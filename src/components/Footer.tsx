import Container from "./Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container>
      <p className="text-center my-4 text-sm">
        Website created by Drew Gifford. &copy; {year} All Rights Reserved
      </p>
    </Container>
  );
}
