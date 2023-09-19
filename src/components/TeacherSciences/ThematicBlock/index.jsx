import { Button, Checkbox, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BoxBody, BoxHeader, ClassScheduleTableWrapper, ModalBox, ModalButtons, ModalHeader, ModalSelectWrapper } from '../../../global_styles/styles'
import { teacher_attendance, teacher_set_nb_students } from '../../../utils/API_urls'
import { TableTHHeader } from '../../DiplomaTable'
import { UnableToSpecify, TeacherSciencesButtonBox, ModalSubtitle } from '../../Vedomost/styles'
import { getTeacherAttendance, setSetNbStudents } from './requests'
import { useNavigate } from "react-router-dom"
// Lang
import listLanguage from './language.json'
import { useSelector } from 'react-redux'

export default function ThematicBlock() {
  const { state } = useLocation()
  const [teacherAttendanceList, setTeacherAttendanceList] = useState([])
  const [studentAttendanceList, setStudentAttendanceList] = useState([])
  let navigate = useNavigate()

  console.log(state, 'sss');

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    getTeacherAttendance(`${teacher_attendance}${state?.id}/`, (response) => {
      setTeacherAttendanceList(response?.data)
    }, (error) => {
      console.log(error)
    })
  }, [])


  const nbChanged = (event, id) => {
    if(event.target.checked){
      const haveNb = studentAttendanceList.findIndex((element) => element == id)
      if(haveNb == -1){
        setStudentAttendanceList(prev => [...prev, id])
      }
    }else{
      setStudentAttendanceList(prev => prev.filter(item =>  item != id))
    }
  }


  const NbSaveBtn = () => {
    setSetNbStudents(teacher_set_nb_students, {
      'lesson' : state.id,
      'students' : studentAttendanceList
    }, (response) => {
      console.log(response);
      navigate('/teacher/sciences')
    }, (error) => {
      console.log(error)
    })
  }

  // Lang
  const language = useSelector(state => state.language)

  return (
    <>
    <Typography
    variant='h2'
    sx={{
      color: '#000',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
      mb: "26px"
    }}
  >
    {listLanguage.AppropriationRecord[language]}
  </Typography>
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        padding: "20px",
        borderRadius: "10px"
      }}
    >
    
      <BoxBody>
        <ClassScheduleTableWrapper>
          <table>
            <thead>
              <tr>
                <TableTHHeader
                  text="#"
                  iconc={null}
                />
                <TableTHHeader
                  text={listLanguage.Students[language]}
                  iconc={null}
                />
                <TableTHHeader
                  text="NB"
                  iconc={null}
                />
              </tr>
            </thead>
            <tbody>
              {
               teacherAttendanceList.length > 0 ? teacherAttendanceList.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <th>{index+1}</th>
                      <th>{elem.full_name}</th>
                      <th style={{ width: "200px" }}>
                        <TeacherSciencesButtonBox style={{ justifyContent: "center", cursor: "pointer  " }}>
                          {
                            state?.data?
                            <Checkbox {...label} onChange = {(event) => {nbChanged(event, elem.id)}}/> :
                            elem.nb?
                            <p style={{color:'red'}}>НБ</p>:
                            <p style={{color:'green'}}>+</p>
                          }
                        </TeacherSciencesButtonBox>
                      </th>
                    </tr>
                  )
                })
                :
                  <tr>
                    <th colSpan={12} align='center'>{listLanguage.NoInfo[language]}</th>
                  </tr>
              }
            </tbody>
          </table>
          {
            state?.data? 
            <Button
                variant="contained"
                sx={{
                  marginTop: '15px',
                  textTransform: "capitalize",
                  boxShadow: "none",
                  padding: "12px 70px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px"
                }}
                onClick = {NbSaveBtn}
                startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_493_2456)">
                    <path d="M10.0013 6.66675C9.34203 6.66675 8.69757 6.86224 8.1494 7.22852C7.60124 7.59479 7.174 8.11538 6.92171 8.72447C6.66941 9.33356 6.6034 10.0038 6.73202 10.6504C6.86064 11.297 7.17811 11.8909 7.64428 12.3571C8.11046 12.8233 8.7044 13.1407 9.351 13.2694C9.99761 13.398 10.6678 13.332 11.2769 13.0797C11.886 12.8274 12.4066 12.4001 12.7729 11.852C13.1391 11.3038 13.3346 10.6594 13.3346 10.0001C13.3346 9.11603 12.9834 8.26818 12.3583 7.64306C11.7332 7.01794 10.8854 6.66675 10.0013 6.66675ZM10.0013 11.6667C9.67167 11.6667 9.34944 11.569 9.07535 11.3859C8.80127 11.2027 8.58765 10.9424 8.4615 10.6379C8.33536 10.3333 8.30235 9.99823 8.36666 9.67493C8.43097 9.35163 8.58971 9.05466 8.82279 8.82157C9.05588 8.58848 9.35285 8.42975 9.67615 8.36544C9.99946 8.30113 10.3346 8.33414 10.6391 8.46028C10.9437 8.58643 11.204 8.80005 11.3871 9.07413C11.5702 9.34821 11.668 9.67045 11.668 10.0001C11.668 10.4421 11.4924 10.866 11.1798 11.1786C10.8673 11.4912 10.4433 11.6667 10.0013 11.6667Z" fill="white" />
                    <path d="M17.7461 11.5833L17.3761 11.37C17.5427 10.4637 17.5427 9.53463 17.3761 8.62833L17.7461 8.415C18.0307 8.25085 18.2801 8.03226 18.4801 7.77172C18.6802 7.51118 18.827 7.21378 18.9121 6.89651C18.9972 6.57925 19.019 6.24832 18.9762 5.92263C18.9335 5.59694 18.827 5.28286 18.6628 4.99833C18.4987 4.7138 18.2801 4.46439 18.0195 4.26434C17.759 4.06428 17.4616 3.91751 17.1443 3.83239C16.8271 3.74726 16.4961 3.72547 16.1704 3.76824C15.8447 3.81101 15.5307 3.91751 15.2461 4.08167L14.8753 4.29583C14.1749 3.69743 13.37 3.23354 12.5011 2.9275V2.5C12.5011 1.83696 12.2377 1.20107 11.7689 0.732233C11.3001 0.263392 10.6642 0 10.0011 0C9.33809 0 8.70221 0.263392 8.23337 0.732233C7.76453 1.20107 7.50113 1.83696 7.50113 2.5V2.9275C6.63229 3.23464 5.82767 3.69967 5.1278 4.29917L4.7553 4.08333C4.18067 3.75181 3.49787 3.66214 2.85712 3.83405C2.21637 4.00596 1.67016 4.42536 1.33863 5C1.00711 5.57464 0.917445 6.25743 1.08935 6.89818C1.26126 7.53893 1.68067 8.08515 2.2553 8.41667L2.6253 8.63C2.45873 9.5363 2.45873 10.4654 2.6253 11.3717L2.2553 11.585C1.68067 11.9165 1.26126 12.4627 1.08935 13.1035C0.917445 13.7442 1.00711 14.427 1.33863 15.0017C1.67016 15.5763 2.21637 15.9957 2.85712 16.1676C3.49787 16.3395 4.18067 16.2499 4.7553 15.9183L5.12613 15.7042C5.82677 16.3027 6.63195 16.7666 7.50113 17.0725V17.5C7.50113 18.163 7.76453 18.7989 8.23337 19.2678C8.70221 19.7366 9.33809 20 10.0011 20C10.6642 20 11.3001 19.7366 11.7689 19.2678C12.2377 18.7989 12.5011 18.163 12.5011 17.5V17.0725C13.37 16.7654 14.1746 16.3003 14.8745 15.7008L15.247 15.9158C15.8216 16.2474 16.5044 16.337 17.1451 16.1651C17.7859 15.9932 18.3321 15.5738 18.6636 14.9992C18.9952 14.4245 19.0848 13.7417 18.9129 13.101C18.741 12.4602 18.3216 11.914 17.747 11.5825L17.7461 11.5833ZM15.6228 8.43667C15.905 9.45922 15.905 10.5391 15.6228 11.5617C15.5735 11.7396 15.5848 11.9289 15.6548 12.0998C15.7247 12.2707 15.8495 12.4135 16.0095 12.5058L16.9128 13.0275C17.1043 13.138 17.2441 13.3201 17.3014 13.5336C17.3586 13.7472 17.3287 13.9747 17.2182 14.1663C17.1077 14.3578 16.9257 14.4975 16.7121 14.5548C16.4985 14.6121 16.271 14.5822 16.0795 14.4717L15.1745 13.9483C15.0144 13.8556 14.828 13.8188 14.6447 13.8437C14.4614 13.8686 14.2915 13.9538 14.162 14.0858C13.4202 14.843 12.4858 15.3833 11.4595 15.6483C11.2803 15.6944 11.1216 15.7987 11.0083 15.9449C10.895 16.0911 10.8335 16.2709 10.8336 16.4558V17.5C10.8336 17.721 10.7458 17.933 10.5896 18.0893C10.4333 18.2455 10.2213 18.3333 10.0003 18.3333C9.77929 18.3333 9.56733 18.2455 9.41105 18.0893C9.25477 17.933 9.16697 17.721 9.16697 17.5V16.4567C9.16706 16.2717 9.10561 16.092 8.99231 15.9458C8.879 15.7996 8.72027 15.6952 8.54113 15.6492C7.51476 15.3831 6.58058 14.8416 5.83947 14.0833C5.70991 13.9513 5.54008 13.8661 5.35676 13.8412C5.17345 13.8163 4.98706 13.8531 4.82697 13.9458L3.92363 14.4683C3.82883 14.5239 3.72396 14.5602 3.61507 14.5751C3.50619 14.59 3.39543 14.5832 3.28918 14.5551C3.18293 14.527 3.08329 14.4782 2.99598 14.4114C2.90868 14.3446 2.83545 14.2613 2.7805 14.1661C2.72555 14.0709 2.68996 13.9658 2.6758 13.8568C2.66163 13.7479 2.66916 13.6372 2.69796 13.5311C2.72675 13.425 2.77624 13.3257 2.84358 13.2389C2.91091 13.152 2.99476 13.0793 3.0903 13.025L3.99363 12.5033C4.15359 12.411 4.27836 12.2682 4.34835 12.0973C4.41834 11.9264 4.42958 11.7371 4.3803 11.5592C4.0981 10.5366 4.0981 9.45672 4.3803 8.43417C4.42869 8.25657 4.41691 8.06795 4.34681 7.89774C4.27671 7.72754 4.15223 7.58534 3.9928 7.49333L3.08947 6.97167C2.89796 6.86116 2.75819 6.6791 2.70092 6.46555C2.64364 6.25199 2.67354 6.02442 2.78405 5.83292C2.89456 5.64141 3.07662 5.50164 3.29017 5.44437C3.50373 5.38709 3.73129 5.41699 3.9228 5.5275L4.8278 6.05083C4.98745 6.14376 5.17345 6.18101 5.35657 6.15672C5.5397 6.13244 5.70956 6.048 5.83947 5.91667C6.58121 5.15945 7.51566 4.61918 8.54197 4.35417C8.72166 4.30797 8.8808 4.20313 8.99416 4.05625C9.10753 3.90938 9.16864 3.72887 9.1678 3.54333V2.5C9.1678 2.27899 9.2556 2.06702 9.41188 1.91074C9.56816 1.75446 9.78012 1.66667 10.0011 1.66667C10.2221 1.66667 10.4341 1.75446 10.5904 1.91074C10.7467 2.06702 10.8345 2.27899 10.8345 2.5V3.54333C10.8344 3.7283 10.8958 3.90804 11.0091 4.05423C11.1224 4.20043 11.2812 4.30478 11.4603 4.35083C12.487 4.61679 13.4215 5.15824 14.1628 5.91667C14.2924 6.04872 14.4622 6.13391 14.6455 6.15881C14.8288 6.1837 15.0152 6.14689 15.1753 6.05417L16.0786 5.53167C16.1734 5.47609 16.2783 5.43981 16.3872 5.42492C16.4961 5.41003 16.6068 5.41683 16.7131 5.44492C16.8193 5.47301 16.919 5.52184 17.0063 5.58859C17.0936 5.65535 17.1668 5.73872 17.2218 5.83389C17.2767 5.92907 17.3123 6.03417 17.3265 6.14316C17.3406 6.25214 17.3331 6.36285 17.3043 6.46891C17.2755 6.57497 17.226 6.67429 17.1587 6.76114C17.0914 6.848 17.0075 6.92068 16.912 6.975L16.0086 7.49667C15.8495 7.58892 15.7254 7.73123 15.6556 7.90141C15.5858 8.07159 15.5743 8.26008 15.6228 8.4375V8.43667Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_493_2456">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>}
              >
            {listLanguage.Save[language]}
            </Button>:
          <></>
          }
        </ClassScheduleTableWrapper>
      </BoxBody>
    </Paper>
    </>
  )
}
