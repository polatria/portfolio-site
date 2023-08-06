"use client"

import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import avater from "../../public/rounded_prof.png"

type ModalProps = {
  buttonLabel: string
}

export function Modal({ buttonLabel }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && <ModalContent onClose={toggleModal} />}
      {!isOpen && <button onClick={toggleModal}>{buttonLabel}</button>}
    </>
  );
}

function ModalContent({ onClose }: {onClose: MouseEventHandler}) {
  return (
    <div className="modal">
      <div className="prof-area flex flex-row">
        <div className="prof-img">
          <Image src={avater} alt={"Profile"} />
        </div>
        <div className="prof-text justify-center items-center">
          1993年に宝塚で生まれ、大阪で育つ。2020年に大阪大学大学院基礎工学研究科にて工学修士を取得。大学在学中、イタリアへ短期留学してプロダクトデザインのいろはを学び、デッサンや手書きアニメーション、水彩画の制作に取り組むなど、デザインスキルの基礎を身につける。修了後、パナソニック株式会社（現
          パナソニックコネクト株式会社）に入社。リードエンジニアとして、オンライン会議サービスのiOS/Androidアプリのフロントエンド開発に約2年従事。その後、プロジェクターをビジネスで活用するプランナーやデザイナー、SEに向けた投影シミュレーションソフトの開発リーダーとして、3Dでの空間設計が可能なUIの開発に取り組んでいる。
        </div>
      </div>
      <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
}
