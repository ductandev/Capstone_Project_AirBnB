'use client'
import React from 'react'
import {useState, useCallback} from 'react'
import { AiOutlineMenu} from 'react-icons/ai'
import { TbWorld} from 'react-icons/tb'
import Avartar from '../../Avartar/Avartar'
import MenuItem from './MenuItem'
import useRegisterModal from '../../../Hooks/useRegisterModal'
import useLoginModal from '../../../Hooks/useLoginModal'
import { USER_LOGIN, clearStorage } from '../../../Util/config'


type Props = {}

export default function UserMenu({ }: Props) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=> {
        setIsOpen((value) => !value);
    }, [])

    return (
        <div className='relative'>
            <div className="flex flex-row items-center gap-2">
                <div className={"hidden lg:block text-sm font-semiblod p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"} onClick={() => { }}>
                    Trở thành chủ nhà
                </div>
                <div className={"hidden lg:block text-xl font-semiblod py-2 px-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"} onClick={() => { }}>
                    <TbWorld/>
                </div>
                <div className={"p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"} onClick={toggleOpen}>
                    <AiOutlineMenu style={{fontSize:'20px'}}/>
                    <div className="hidden md:block">
                        <Avartar/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-52 lg:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm mt-2 border-[1px] border-solid border-light-gray'>
                    <div className='flex flex-col cursor-pointer'>
                        <>
                        <MenuItem onClick={loginModal.onOpen} label='Đăng nhập'/>
                        <MenuItem onClick={registerModal.onOpen} label='Đăng ký'/>
                        <hr />
                        <MenuItem onClick={() => {}} label='Cho thuê nhà'/>
                        <MenuItem onClick={() => {}} label='Tổ chức'/>
                        <MenuItem onClick={() => {}} label='Trợ giúp'/>
                        <hr />
                        <MenuItem onClick={() => {
                            clearStorage(USER_LOGIN);
                            window.location.reload(); //f5
                        }} label='Đăng xuất'/>
                        </>

                    </div>
                </div>
            )}
        </div>
    )
}