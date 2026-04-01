import templeDoor from "@/assets/temple-door.jpg";

const HeroSection = () => {
  return (
    <section
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: '#223348' }}
    >
      <img
        src={templeDoor}
        alt="Temple door"
        className="h-full object-contain"
      />
    </section>
  );
};

export default HeroSection;
