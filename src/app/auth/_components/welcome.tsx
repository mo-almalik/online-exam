import Image from 'next/image';
import welcomeImage from 'assets/images/bro.png';
export default function Welcome() {
  return (
    <div className='bg-[#F0F4FC]  px-20 pt-5 pb-0 min-h-screen flex flex-col gap-y-2 items-start justify-around'>
      <div>
        <h1 className='text-4xl font-bold text-black leading-[3.125rem]'>
          Welcome to <span className='block text-[#122D9C]'>Elevate</span>
        </h1>
        <p className='text-lg w-[90%]'>
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>
      </div>
      <div>
        <Image src={welcomeImage} width={350} alt='welcome' />
      </div>
    </div>
  );
}
