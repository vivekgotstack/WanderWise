// BusLoader.tsx
export default function BusLoader() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "20px",
          zIndex: 1000,
        }}
      >
        Loading bus scene...
      </div>
    );
  }
  