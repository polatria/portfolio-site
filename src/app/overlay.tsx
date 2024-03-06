import { Modal } from "./about";

export default function Overlay() {
  return (
    <>
      <div className="neon absolute top-10 left-10 text-xs">
        <div>
          Portfolio Page
        </div>
      </div>
      <div className="absolute bottom-10 right-10 text-xs">
        © 2024 Tomoki S.
      </div>
    </>
  );
}
