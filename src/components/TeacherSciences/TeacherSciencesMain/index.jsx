import React, { useEffect, useState } from 'react'
import { BoxBody, BoxFooter, BoxFooterText, BoxHeader, ClassScheduleTableWrapper } from '../../../global_styles/styles'
import { Pagination, Paper } from '@mui/material'
import PageSelector from '../../PageSelector'
import CustomizedInput from '../../CustomizedInput'
import { TableTHHeader } from '../../DiplomaTable'
import Button from '@mui/material/Button'
import { TeacherSciencesButtonBox } from '../styles'
import { Link } from "react-router-dom";
import AllSelect from '../../AllSelect'
import { my_semesters, teacher_mylessons } from '../../../utils/API_urls'
import { getSemester } from '../../FilingApplication/requests'
import { getTeacherMyLesson } from './requests'

export default function TeacherSciencesMain() {
  const [semesters, setSemesters] = useState([])
  const [semester, setSemester] = useState(0)

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [allCount, setAllCount] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [teacheMyLessonList, setteacheMyLessonList] = useState([])






  const getSemesters = (response) => {
    const semester_firstly = response.data.map(element => {
      return {
        value: element.id,
        name: element.parent + " " + element.name
      }
    })
    setSemester(semester_firstly[0].value)
    setSemesters(semester_firstly)
  }


  const getSemestersEror = (error) => { console.log(error) }

  useEffect(() => {
    getSemester(my_semesters, getSemesters, getSemestersEror)
  }, [])


  useEffect(() => {
    if (semester !== 0) {
      getTeacherMyLesson(`${teacher_mylessons}?semester=${semester}&page_size=${pageSize}&page=${page}`, (response) => {
        setAllCount(response.data.count)
        setPageCount(response.data.page_count)
        setteacheMyLessonList(response.data.results)
      }, (error) => {
        console.log(error)
      })
    }
  }, [page, pageSize, semester])

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <BoxHeader>
        <AllSelect
          chageValueFunction={val => { setSemester(val) }}
          selectOptions={semesters}
        />
      </BoxHeader>
      <BoxHeader>
        <PageSelector chageValueFunction={(val) => {
          setPageSize(val)
        }} />
        <CustomizedInput callback_func={(val) => { console.log(val) }} />
      </BoxHeader>
      <BoxBody>
        <ClassScheduleTableWrapper>
          <table>
            <thead>
              <tr>
                <TableTHHeader
                  text="Fan"
                  iconc={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_78_23314)">
                      <path d="M16.0008 0.666667C16.0008 1.03533 15.7021 1.33333 15.3341 1.33333H6.66746C6.29946 1.33333 6.00079 1.03533 6.00079 0.666667C6.00079 0.298 6.29946 0 6.66746 0H15.3341C15.7021 0 16.0008 0.298 16.0008 0.666667ZM13.3341 3.33333H6.66746C6.29946 3.33333 6.00079 3.63133 6.00079 4C6.00079 4.36867 6.29946 4.66667 6.66746 4.66667H13.3341C13.7021 4.66667 14.0008 4.36867 14.0008 4C14.0008 3.63133 13.7021 3.33333 13.3341 3.33333ZM11.3341 6.66667H6.66746C6.29946 6.66667 6.00079 6.96467 6.00079 7.33333C6.00079 7.702 6.29946 8 6.66746 8H11.3341C11.7021 8 12.0008 7.702 12.0008 7.33333C12.0008 6.96467 11.7021 6.66667 11.3341 6.66667ZM9.33412 10H6.66746C6.29946 10 6.00079 10.298 6.00079 10.6667C6.00079 11.0353 6.29946 11.3333 6.66746 11.3333H9.33412C9.70212 11.3333 10.0008 11.0353 10.0008 10.6667C10.0008 10.298 9.70212 10 9.33412 10ZM5.13879 12.862L4.00079 14V0.666667C4.00079 0.298 3.70212 0 3.33412 0C2.96612 0 2.66746 0.298 2.66746 0.666667V14L1.52879 12.8613C1.26812 12.6007 0.846792 12.6007 0.586125 12.8613C0.325458 13.122 0.325458 13.5433 0.586125 13.804L2.39079 15.6087C2.65079 15.8687 2.99212 15.9987 3.33412 15.9987C3.67612 15.9987 4.01679 15.8687 4.27679 15.6087L6.08146 13.804C6.34212 13.5433 6.34212 13.122 6.08146 12.8613C5.82079 12.6007 5.39946 12.6013 5.13879 12.862Z" fill="#B8B8B8" />
                    </g>
                    <defs>
                      <clipPath id="clip0_78_23314">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>}
                />
                <TableTHHeader
                  text="Patok"
                  iconc={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_78_23314)">
                      <path d="M16.0008 0.666667C16.0008 1.03533 15.7021 1.33333 15.3341 1.33333H6.66746C6.29946 1.33333 6.00079 1.03533 6.00079 0.666667C6.00079 0.298 6.29946 0 6.66746 0H15.3341C15.7021 0 16.0008 0.298 16.0008 0.666667ZM13.3341 3.33333H6.66746C6.29946 3.33333 6.00079 3.63133 6.00079 4C6.00079 4.36867 6.29946 4.66667 6.66746 4.66667H13.3341C13.7021 4.66667 14.0008 4.36867 14.0008 4C14.0008 3.63133 13.7021 3.33333 13.3341 3.33333ZM11.3341 6.66667H6.66746C6.29946 6.66667 6.00079 6.96467 6.00079 7.33333C6.00079 7.702 6.29946 8 6.66746 8H11.3341C11.7021 8 12.0008 7.702 12.0008 7.33333C12.0008 6.96467 11.7021 6.66667 11.3341 6.66667ZM9.33412 10H6.66746C6.29946 10 6.00079 10.298 6.00079 10.6667C6.00079 11.0353 6.29946 11.3333 6.66746 11.3333H9.33412C9.70212 11.3333 10.0008 11.0353 10.0008 10.6667C10.0008 10.298 9.70212 10 9.33412 10ZM5.13879 12.862L4.00079 14V0.666667C4.00079 0.298 3.70212 0 3.33412 0C2.96612 0 2.66746 0.298 2.66746 0.666667V14L1.52879 12.8613C1.26812 12.6007 0.846792 12.6007 0.586125 12.8613C0.325458 13.122 0.325458 13.5433 0.586125 13.804L2.39079 15.6087C2.65079 15.8687 2.99212 15.9987 3.33412 15.9987C3.67612 15.9987 4.01679 15.8687 4.27679 15.6087L6.08146 13.804C6.34212 13.5433 6.34212 13.122 6.08146 12.8613C5.82079 12.6007 5.39946 12.6013 5.13879 12.862Z" fill="#B8B8B8" />
                    </g>
                    <defs>
                      <clipPath id="clip0_78_23314">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>}
                />
                <TableTHHeader
                  text="Turi"
                  iconc={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_78_23319)">
                      <path d="M5.33365 15.3334L5.33365 1.78741L5.34365 1.79674L6.86699 3.29274C6.92848 3.3582 7.00257 3.41056 7.08481 3.44667C7.16704 3.48279 7.25572 3.50191 7.34553 3.5029C7.43534 3.50389 7.52442 3.48672 7.60743 3.45242C7.69044 3.41813 7.76566 3.36741 7.82859 3.30332C7.89151 3.23923 7.94083 3.16309 7.97359 3.07946C8.00636 2.99584 8.02188 2.90645 8.01924 2.81668C8.0166 2.7269 7.99585 2.63858 7.95823 2.55703C7.92061 2.47547 7.8669 2.40236 7.80032 2.34208L6.28232 0.849411C6.17365 0.740744 6.00699 0.588744 5.83165 0.433411C5.51624 0.154465 5.10971 0.000488154 4.68865 0.000488136C4.26759 0.000488117 3.86106 0.154465 3.54565 0.433411C3.37099 0.588744 3.20432 0.740744 3.09899 0.845411L1.57632 2.34208C1.45845 2.46754 1.39368 2.63374 1.39557 2.80588C1.39746 2.97802 1.46587 3.14275 1.58648 3.2656C1.70708 3.38844 1.87053 3.45987 2.0426 3.46493C2.21468 3.46999 2.38204 3.40829 2.50965 3.29274L4.00032 1.82941L4.00032 15.3334C4.00032 15.5102 4.07056 15.6798 4.19558 15.8048C4.3206 15.9298 4.49017 16.0001 4.66699 16.0001C4.8438 16.0001 5.01337 15.9298 5.13839 15.8048C5.26341 15.6798 5.33365 15.5102 5.33365 15.3334Z" fill="#B8B8B8" />
                      <path d="M10.6677 0.666667L10.6676 14.17L9.17898 12.7073C9.11749 12.6419 9.0434 12.5895 8.96116 12.5534C8.87893 12.5173 8.79025 12.4982 8.70044 12.4972C8.61063 12.4962 8.52154 12.5134 8.43854 12.5477C8.35553 12.582 8.2803 12.6327 8.21738 12.6968C8.15446 12.7608 8.10514 12.837 8.07238 12.9206C8.03961 13.0042 8.02408 13.0936 8.02672 13.1834C8.02936 13.2732 8.05012 13.3615 8.08774 13.4431C8.12536 13.5246 8.17907 13.5977 8.24565 13.658L9.76498 15.1507C9.87365 15.2593 10.0403 15.4113 10.215 15.5667C10.5304 15.8456 10.9369 15.9996 11.358 15.9996C11.779 15.9996 12.1856 15.8456 12.501 15.5667C12.6763 15.4113 12.843 15.2593 12.9476 15.1547L14.4676 13.658C14.5855 13.5325 14.6503 13.3663 14.6484 13.1942C14.6465 13.0221 14.5781 12.8573 14.4575 12.7345C14.3369 12.6116 14.1734 12.5402 14.0014 12.5352C13.8293 12.5301 13.6619 12.5918 13.5343 12.7073L12.0076 14.208L12.001 14.2133L12.001 0.666667C12.001 0.489856 11.9307 0.320286 11.8057 0.195262C11.6807 0.0702378 11.5111 -1.37136e-07 11.3343 -1.44865e-07C11.1575 -1.52593e-07 10.9879 0.0702378 10.8629 0.195262C10.7379 0.320286 10.6677 0.489856 10.6677 0.666667Z" fill="#B8B8B8" />
                    </g>
                    <defs>
                      <clipPath id="clip0_78_23319">
                        <rect width="16" height="16" fill="white" transform="translate(16) rotate(90)" />
                      </clipPath>
                    </defs>
                  </svg>
                  }
                />
                <TableTHHeader
                  text="Talabalar"
                  iconc={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_78_23319)">
                      <path d="M5.33365 15.3334L5.33365 1.78741L5.34365 1.79674L6.86699 3.29274C6.92848 3.3582 7.00257 3.41056 7.08481 3.44667C7.16704 3.48279 7.25572 3.50191 7.34553 3.5029C7.43534 3.50389 7.52442 3.48672 7.60743 3.45242C7.69044 3.41813 7.76566 3.36741 7.82859 3.30332C7.89151 3.23923 7.94083 3.16309 7.97359 3.07946C8.00636 2.99584 8.02188 2.90645 8.01924 2.81668C8.0166 2.7269 7.99585 2.63858 7.95823 2.55703C7.92061 2.47547 7.8669 2.40236 7.80032 2.34208L6.28232 0.849411C6.17365 0.740744 6.00699 0.588744 5.83165 0.433411C5.51624 0.154465 5.10971 0.000488154 4.68865 0.000488136C4.26759 0.000488117 3.86106 0.154465 3.54565 0.433411C3.37099 0.588744 3.20432 0.740744 3.09899 0.845411L1.57632 2.34208C1.45845 2.46754 1.39368 2.63374 1.39557 2.80588C1.39746 2.97802 1.46587 3.14275 1.58648 3.2656C1.70708 3.38844 1.87053 3.45987 2.0426 3.46493C2.21468 3.46999 2.38204 3.40829 2.50965 3.29274L4.00032 1.82941L4.00032 15.3334C4.00032 15.5102 4.07056 15.6798 4.19558 15.8048C4.3206 15.9298 4.49017 16.0001 4.66699 16.0001C4.8438 16.0001 5.01337 15.9298 5.13839 15.8048C5.26341 15.6798 5.33365 15.5102 5.33365 15.3334Z" fill="#B8B8B8" />
                      <path d="M10.6677 0.666667L10.6676 14.17L9.17898 12.7073C9.11749 12.6419 9.0434 12.5895 8.96116 12.5534C8.87893 12.5173 8.79025 12.4982 8.70044 12.4972C8.61063 12.4962 8.52154 12.5134 8.43854 12.5477C8.35553 12.582 8.2803 12.6327 8.21738 12.6968C8.15446 12.7608 8.10514 12.837 8.07238 12.9206C8.03961 13.0042 8.02408 13.0936 8.02672 13.1834C8.02936 13.2732 8.05012 13.3615 8.08774 13.4431C8.12536 13.5246 8.17907 13.5977 8.24565 13.658L9.76498 15.1507C9.87365 15.2593 10.0403 15.4113 10.215 15.5667C10.5304 15.8456 10.9369 15.9996 11.358 15.9996C11.779 15.9996 12.1856 15.8456 12.501 15.5667C12.6763 15.4113 12.843 15.2593 12.9476 15.1547L14.4676 13.658C14.5855 13.5325 14.6503 13.3663 14.6484 13.1942C14.6465 13.0221 14.5781 12.8573 14.4575 12.7345C14.3369 12.6116 14.1734 12.5402 14.0014 12.5352C13.8293 12.5301 13.6619 12.5918 13.5343 12.7073L12.0076 14.208L12.001 14.2133L12.001 0.666667C12.001 0.489856 11.9307 0.320286 11.8057 0.195262C11.6807 0.0702378 11.5111 -1.37136e-07 11.3343 -1.44865e-07C11.1575 -1.52593e-07 10.9879 0.0702378 10.8629 0.195262C10.7379 0.320286 10.6677 0.489856 10.6677 0.666667Z" fill="#B8B8B8" />
                    </g>
                    <defs>
                      <clipPath id="clip0_78_23319">
                        <rect width="16" height="16" fill="white" transform="translate(16) rotate(90)" />
                      </clipPath>
                    </defs>
                  </svg>
                  }
                />
                <TableTHHeader
                  text="Sozlamalar"
                  iconc={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_78_23319)">
                      <path d="M5.33365 15.3334L5.33365 1.78741L5.34365 1.79674L6.86699 3.29274C6.92848 3.3582 7.00257 3.41056 7.08481 3.44667C7.16704 3.48279 7.25572 3.50191 7.34553 3.5029C7.43534 3.50389 7.52442 3.48672 7.60743 3.45242C7.69044 3.41813 7.76566 3.36741 7.82859 3.30332C7.89151 3.23923 7.94083 3.16309 7.97359 3.07946C8.00636 2.99584 8.02188 2.90645 8.01924 2.81668C8.0166 2.7269 7.99585 2.63858 7.95823 2.55703C7.92061 2.47547 7.8669 2.40236 7.80032 2.34208L6.28232 0.849411C6.17365 0.740744 6.00699 0.588744 5.83165 0.433411C5.51624 0.154465 5.10971 0.000488154 4.68865 0.000488136C4.26759 0.000488117 3.86106 0.154465 3.54565 0.433411C3.37099 0.588744 3.20432 0.740744 3.09899 0.845411L1.57632 2.34208C1.45845 2.46754 1.39368 2.63374 1.39557 2.80588C1.39746 2.97802 1.46587 3.14275 1.58648 3.2656C1.70708 3.38844 1.87053 3.45987 2.0426 3.46493C2.21468 3.46999 2.38204 3.40829 2.50965 3.29274L4.00032 1.82941L4.00032 15.3334C4.00032 15.5102 4.07056 15.6798 4.19558 15.8048C4.3206 15.9298 4.49017 16.0001 4.66699 16.0001C4.8438 16.0001 5.01337 15.9298 5.13839 15.8048C5.26341 15.6798 5.33365 15.5102 5.33365 15.3334Z" fill="#B8B8B8" />
                      <path d="M10.6677 0.666667L10.6676 14.17L9.17898 12.7073C9.11749 12.6419 9.0434 12.5895 8.96116 12.5534C8.87893 12.5173 8.79025 12.4982 8.70044 12.4972C8.61063 12.4962 8.52154 12.5134 8.43854 12.5477C8.35553 12.582 8.2803 12.6327 8.21738 12.6968C8.15446 12.7608 8.10514 12.837 8.07238 12.9206C8.03961 13.0042 8.02408 13.0936 8.02672 13.1834C8.02936 13.2732 8.05012 13.3615 8.08774 13.4431C8.12536 13.5246 8.17907 13.5977 8.24565 13.658L9.76498 15.1507C9.87365 15.2593 10.0403 15.4113 10.215 15.5667C10.5304 15.8456 10.9369 15.9996 11.358 15.9996C11.779 15.9996 12.1856 15.8456 12.501 15.5667C12.6763 15.4113 12.843 15.2593 12.9476 15.1547L14.4676 13.658C14.5855 13.5325 14.6503 13.3663 14.6484 13.1942C14.6465 13.0221 14.5781 12.8573 14.4575 12.7345C14.3369 12.6116 14.1734 12.5402 14.0014 12.5352C13.8293 12.5301 13.6619 12.5918 13.5343 12.7073L12.0076 14.208L12.001 14.2133L12.001 0.666667C12.001 0.489856 11.9307 0.320286 11.8057 0.195262C11.6807 0.0702378 11.5111 -1.37136e-07 11.3343 -1.44865e-07C11.1575 -1.52593e-07 10.9879 0.0702378 10.8629 0.195262C10.7379 0.320286 10.6677 0.489856 10.6677 0.666667Z" fill="#B8B8B8" />
                    </g>
                    <defs>
                      <clipPath id="clip0_78_23319">
                        <rect width="16" height="16" fill="white" transform="translate(16) rotate(90)" />
                      </clipPath>
                    </defs>
                  </svg>
                  }
                />
                
              </tr>
            </thead>
            <tbody>
              {
                teacheMyLessonList.length > 0 ? teacheMyLessonList.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <th>{elem.science}</th>
                      <th>{elem.name}</th>
                      <th>{elem.science_type}</th>
                      <th>{elem.students}</th>
                      <th style={{ width: "500px" }}>
                        <TeacherSciencesButtonBox>
                          <Link to="calendarplan" state={{ data: elem.id }}>
                            <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                                boxShadow: "none",
                                width: "181px"
                              }}
                              startIcon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_78_22124)">
                                  <path d="M12.6667 1.33333H12V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.489856 5.2631 0.320286 5.13807 0.195262C5.01305 0.0702379 4.84348 0 4.66667 0C4.48986 0 4.32029 0.0702379 4.19526 0.195262C4.07024 0.320286 4 0.489856 4 0.666667V1.33333H3.33333C2.4496 1.33439 1.60237 1.68592 0.97748 2.31081C0.352588 2.93571 0.00105857 3.78294 0 4.66667L0 12.6667C0.00105857 13.5504 0.352588 14.3976 0.97748 15.0225C1.60237 15.6474 2.4496 15.9989 3.33333 16H12.6667C13.5504 15.9989 14.3976 15.6474 15.0225 15.0225C15.6474 14.3976 15.9989 13.5504 16 12.6667V4.66667C15.9989 3.78294 15.6474 2.93571 15.0225 2.31081C14.3976 1.68592 13.5504 1.33439 12.6667 1.33333ZM1.33333 4.66667C1.33333 4.13623 1.54405 3.62753 1.91912 3.25245C2.29419 2.87738 2.8029 2.66667 3.33333 2.66667H12.6667C13.1971 2.66667 13.7058 2.87738 14.0809 3.25245C14.456 3.62753 14.6667 4.13623 14.6667 4.66667V5.33333H1.33333V4.66667ZM12.6667 14.6667H3.33333C2.8029 14.6667 2.29419 14.456 1.91912 14.0809C1.54405 13.7058 1.33333 13.1971 1.33333 12.6667V6.66667H14.6667V12.6667C14.6667 13.1971 14.456 13.7058 14.0809 14.0809C13.7058 14.456 13.1971 14.6667 12.6667 14.6667Z" fill="black" />
                                  <path d="M8 11C8.55228 11 9 10.5523 9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11Z" fill="black" />
                                  <path d="M4.66797 11C5.22025 11 5.66797 10.5523 5.66797 10C5.66797 9.44772 5.22025 9 4.66797 9C4.11568 9 3.66797 9.44772 3.66797 10C3.66797 10.5523 4.11568 11 4.66797 11Z" fill="black" />
                                  <path d="M11.332 11C11.8843 11 12.332 10.5523 12.332 10C12.332 9.44772 11.8843 9 11.332 9C10.7797 9 10.332 9.44772 10.332 10C10.332 10.5523 10.7797 11 11.332 11Z" fill="black" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_78_22124">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              }
                            >
                              Kalendar reja
                            </Button>
                          </Link>
                          <Link to={'vedomost'} state={{ data: elem.id }}>
                            <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                                boxShadow: "none",
                                width: "181px"
                              }}
                              startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clipPath="url(#clip0_78_22131)">
                                  <path d="M13.298 3.69068L10.9754 1.36668C10.5429 0.932107 10.0286 0.587569 9.46218 0.352988C8.89575 0.118407 8.28844 -0.00156258 7.67536 1.53658e-05H4.66536C3.78163 0.00107394 2.9344 0.352603 2.30951 0.977495C1.68462 1.60239 1.33309 2.44962 1.33203 3.33335V12.6667C1.33309 13.5504 1.68462 14.3976 2.30951 15.0225C2.9344 15.6474 3.78163 15.999 4.66536 16H11.332C12.2158 15.999 13.063 15.6474 13.6879 15.0225C14.3128 14.3976 14.6643 13.5504 14.6654 12.6667V6.99002C14.667 6.37696 14.547 5.76968 14.3123 5.20333C14.0776 4.63699 13.7329 4.12284 13.298 3.69068ZM12.3554 4.63335C12.5589 4.84278 12.734 5.07814 12.876 5.33335H9.9987C9.82189 5.33335 9.65232 5.26311 9.52729 5.13809C9.40227 5.01306 9.33203 4.84349 9.33203 4.66668V1.78935C9.58732 1.9313 9.82289 2.10612 10.0327 2.30935L12.3554 4.63335ZM13.332 12.6667C13.332 13.1971 13.1213 13.7058 12.7462 14.0809C12.3712 14.456 11.8625 14.6667 11.332 14.6667H4.66536C4.13493 14.6667 3.62622 14.456 3.25115 14.0809C2.87608 13.7058 2.66536 13.1971 2.66536 12.6667V3.33335C2.66536 2.80292 2.87608 2.29421 3.25115 1.91914C3.62622 1.54406 4.13493 1.33335 4.66536 1.33335H7.67536C7.7847 1.33335 7.8907 1.35468 7.9987 1.36468V4.66668C7.9987 5.19711 8.20941 5.70582 8.58448 6.0809C8.95956 6.45597 9.46827 6.66668 9.9987 6.66668H13.3007C13.3107 6.77468 13.332 6.88002 13.332 6.99002V12.6667Z" fill="black" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_78_22131">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>}
                            >
                              Vedomost
                            </Button>
                          </Link>
                          <Link to={'journal'} state={{ data: elem.id }}>
                            <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                                boxShadow: "none",
                                width: "181px"
                              }}
                              startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
                              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                            </svg>}
                            >
                              Jurnal
                            </Button>
                          </Link>
                          <Link to={"tasks"} state={{ data: elem.id, name: elem.name }}>
                            <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                                boxShadow: "none",
                                width: "181px"
                              }}
                              startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clipPath="url(#clip0_78_22135)">
                                  <path d="M15.0001 2.65088H12.9428C12.811 2.65091 12.6821 2.69002 12.5725 2.76328C12.4629 2.83653 12.3775 2.94064 12.327 3.06244C12.2766 3.18424 12.2634 3.31826 12.2891 3.44757C12.3148 3.57687 12.3783 3.69564 12.4715 3.78888L13.1955 4.51288L10.8048 6.90288C10.6778 7.02428 10.5088 7.09202 10.3331 7.09202C10.1574 7.09202 9.9885 7.02428 9.86148 6.90288L9.74814 6.78888C9.36722 6.42493 8.86065 6.22183 8.33381 6.22183C7.80696 6.22183 7.3004 6.42493 6.91948 6.78888L3.51948 10.1889C3.39421 10.3145 3.32397 10.4847 3.32422 10.6622C3.32447 10.8396 3.39518 11.0096 3.52081 11.1349C3.64643 11.2601 3.81668 11.3304 3.99409 11.3301C4.17149 11.3299 4.34154 11.2592 4.46681 11.1335L7.86681 7.73355C7.99375 7.612 8.16272 7.54415 8.33848 7.54415C8.51423 7.54415 8.6832 7.612 8.81014 7.73355L8.92348 7.84755C9.30456 8.21119 9.81106 8.41409 10.3378 8.41409C10.8646 8.41409 11.3711 8.21119 11.7521 7.84755L14.1428 5.45688L14.8668 6.18088C14.9604 6.27258 15.0788 6.33469 15.2075 6.35944C15.3361 6.3842 15.4692 6.37051 15.5901 6.32009C15.711 6.26967 15.8144 6.18474 15.8873 6.07592C15.9602 5.9671 15.9995 5.83921 16.0001 5.70821V3.65088C16.0001 3.38566 15.8948 3.13131 15.7072 2.94377C15.5197 2.75624 15.2654 2.65088 15.0001 2.65088Z" fill="black" />
                                  <path d="M15.3333 14.6507H3.33333C2.8029 14.6507 2.29419 14.44 1.91912 14.0649C1.54405 13.6898 1.33333 13.1811 1.33333 12.6507V0.666667C1.33333 0.489856 1.2631 0.320286 1.13807 0.195262C1.01305 0.0702379 0.843478 0 0.666667 0C0.489856 0 0.320286 0.0702379 0.195262 0.195262C0.0702379 0.320286 0 0.489856 0 0.666667L0 12.6507C0.00105857 13.5344 0.352588 14.3816 0.97748 15.0065C1.60237 15.6314 2.4496 15.9829 3.33333 15.984H15.3333C15.5101 15.984 15.6797 15.9138 15.8047 15.7887C15.9298 15.6637 16 15.4941 16 15.3173C16 15.1405 15.9298 14.971 15.8047 14.8459C15.6797 14.7209 15.5101 14.6507 15.3333 14.6507Z" fill="black" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_78_22135">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>}
                            >
                              Vazifalar
                            </Button>
                          </Link>
                          <Link to={'addcalendarplan'} state={{data: elem.id, science: elem.science}}>
                            <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                                boxShadow: "none",
                                width: "181px"
                              }}
                              startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                            </svg>}
                            >
                              Material qo'shish
                            </Button>
                          </Link>
                        </TeacherSciencesButtonBox>
                      </th>
                    </tr>
                  )
                })
                  :
                  <tr>
                    <th colSpan={12} align='center'>Ma'lumot yo'q</th>
                  </tr>
              }
            </tbody>
          </table>
        </ClassScheduleTableWrapper>
      </BoxBody>
      <BoxFooter>
        <BoxFooterText>{`Jami ${allCount} ta, ${pageSize * (page - 1) + 1} dan ${pageSize * (page - 1) + teacheMyLessonList.length} gachasi ko'rsatilmoqda`}</BoxFooterText>
        <Pagination count={pageCount} shape="rounded" color="primary" onChange={(_, value) => { setPage(value) }} />
      </BoxFooter>
    </Paper>
  )
}
