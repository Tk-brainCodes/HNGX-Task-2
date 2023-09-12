import LoadingSpiner from "./(components)/Loading";

type Props = {};

function loading({}: Props) {
  return (
    <div className='w-[100vw] h-[100vw] bg-rose-700 text-white'>
      <LoadingSpiner text='Movies' />
    </div>
  );
}

export default loading;
