import { Modal } from "./about";

export default function Overlay() {
  return (
    <>
      <div className="neon absolute top-10 left-10 text-xs">
        <div>
          Harmonia Design
        </div>
      </div>
      <div className="absolute bottom-10 left-10 right-10 text-xs">
        <Modal buttonLabel="About us" />
      </div>
      <div className="absolute bottom-10 right-10 text-xs">
        © 2023 Harmonia Design Inc.
      </div>
    </>
  );
}
