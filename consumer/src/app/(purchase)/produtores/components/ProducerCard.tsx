import Image from "next/image";
import Link from "next/link";

interface ProducerCardProps {
  id: string;
  name: string;
  caf: string;
  cycleId: string;
}

export default function ProducerCard({
  id,
  name,
  caf,
  cycleId,
}: ProducerCardProps) {
  return (
    <Link href={`/ofertas/${id}/${name}/${cycleId}`}>
      <div className="min-w-[350px] h-[100px] bg-[rgb(246,246,246)] flex rounded-2xl m-[10px]">
        <div className="flex w-20 h-20 ml-[10px] mt-[10px] mb-[10px] mr-[20px] bg-[#00735E] rounded-[11px]">
          <Image
            src={caf != "123456789" ? "/produtor.jpg" : "/produtor2.jpeg"}
            className="w-full h-full object-cover rounded-[10px]"
            width={80}
            height={80}
            alt={`produtor.jpg`}
          />
        </div>
        <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
          <span className="w-full text-left text-base text-[#2F4A4D]">
            {name}
          </span>
        </div>
        <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
          <Image src="/arrow.png" alt="arrow" width={10} height={7} />
        </div>
      </div>
    </Link>
  );
}
