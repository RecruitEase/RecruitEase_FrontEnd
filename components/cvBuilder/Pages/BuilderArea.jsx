import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react';
import UserDataCollect from '../Components/UserDataCollect/UserDataCollect';
import './BuilderArea.css'
import ResumeContext from '../Context/ResumeContext';
import PropagateLoader from "react-spinners/PropagateLoader";

const BuilderArea = (props) => {
    const { showComponent, setShowComponent, loading, handlePrint } = useContext(ResumeContext)

    const handleSelectNewTemplate = () => {
        setShowComponent(!showComponent)
    }

    return (
        <>
            {loading && <PropagateLoader id='spinner' color="#0179FE" size={30} />}

            <div id='main-box' className="d-flex justify-content-between  mt-4  flex md:flex-row flex-col justify-between">
                <UserDataCollect />
                <div id='theme-box-border' className={"md:w-[50%] w-full"}>
                    {props.theme}
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <Button className='mx-2 my-5'   bg={'#0179FE'}
                        _hover={{ bg: '#319795' }} colorScheme={'blue'} color={"white"} variant={'outline'} onClick={handlePrint}>Print</Button>
                <Button className='mx-2 my-5' bg={'#0179FE'}
                        _hover={{ bg: '#319795' }} colorScheme={'blue'} color={"white"} variant={'outline'} onClick={handleSelectNewTemplate}>Select Another Template</Button>
            </div>
        </>
    )
}

export default BuilderArea
