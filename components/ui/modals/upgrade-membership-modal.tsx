import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const MembershipModal: React.FC<ModalProps> = ({ visible, setVisible, children }) => {
  return (
    <Transition show={visible} as={Fragment}>
      <Dialog onClose={() => setVisible(false)} static={true} open={visible}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 z-50 transition-opacity bg-black bg-opacity-75 backdrop-filter backdrop-blur'></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100 '
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100 '
          leaveTo='opacity-0 scale-95 0'
        >
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <Dialog.Panel className='relative h-full xl:h-[500px] w-full  sm:mt-0 sm:w-[650px]  flex bg-white rounded-sm shadow-md'>
              <div className='absolute top-0 right-0 mt-4 mr-4'>
                <button
                  onClick={() => setVisible(false)}
                  className='hover:opacity-70 focus:outline-none '
                >
                  <X className='w-5 h-5' aria-hidden='true' />
                </button>
              </div>

              <div className='flex flex-col flex-1 px-8 py-10 text-left rounded-t-md'>
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MembershipModal;