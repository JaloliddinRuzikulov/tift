import { Modal, Paper, Snackbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { BoxBody, BoxFooter, BoxFooterText, BoxHeader, ClassScheduleTableWrapper, ModalBox, ModalButtons, ModalHeader, ModalSelectWrapper } from '../../../global_styles/styles'
import { Pagination } from '@mui/material'
import { TableTHHeader } from '../../DiplomaTable'
import Button from '@mui/material/Button'
import { StudentAIButton, StudentTasksBox } from './styles'
import { Link, useLocation } from 'react-router-dom'
import { host, my_patok, my_task_put, my_task_submission } from '../../../utils/API_urls'
import { createTaskSubmission, getMyPatok, PutTaskSubmission } from './requests'
import { dateFormatter } from '../../../utils/dateFormatter'
import AllSelectFullWidth from '../../AllSelectFullWidth'
import { MuiFileInput } from 'mui-file-input'
import MuiAlert from '@mui/material/Alert';

const baho = (ball) => {
  if (ball >= 90) {
    return 5
  } else if (ball >= 70) {
    return 4
  } else if (ball >= 60) {
    return 3
  } else {
    return 2
  }
}


export default function Tasks() {
  const { state } = useLocation()
  const [myPatokList, setmyPatokList] = useState([])
  const [ball1, setBall1] = useState(0)
  const [ball2, setBall2] = useState(0)
  const [Status, setStatus] = useState(false)

  useEffect(() => {
    getMyPatok(`${my_patok}${state.data}/`, (response) => {
      setmyPatokList(response.data.tasks)
      response.data.tasks.forEach(element => {
        setBall1(prev => {
          return prev + (parseFloat(element.grade) || 0)
        })
        setBall2(prev => {
          return prev + (parseFloat(element.submisson.grade) || 0)
        })
      });
    }, (error) => {
      console.log(error)
    })
  }, [Status])

  return (
    <>
      <Typography
        variant="h6"
        component="h4"
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#151515",
          fontStyle: "normal",
          lineHeight: "normal"
        }}
      >
        Vazifalar
      </Typography>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          padding: "20px",
          borderRadius: "10px"
        }}
      >

        <BoxHeader>
          <StudentTasksBox>
            <p>To'plangan bal</p>
            <b>{ball2}</b>
          </StudentTasksBox>
          <StudentTasksBox>
            <p>Maks. bal</p>
            <b>{ball1}</b>
          </StudentTasksBox>
          <StudentTasksBox>
            <p>O’zlashtirish</p>
            <b>{ball1 !== 0 ? Math.round((ball2 / ball1) * 100) : 0}%</b>
          </StudentTasksBox>
          <StudentTasksBox>
            <p>Hozirgi bahosi</p>
            <b>{baho(ball1 !== 0 ? Math.round((ball2 / ball1) * 100) : 0)}</b>
          </StudentTasksBox>
        </BoxHeader>
        <BoxBody>
          <ClassScheduleTableWrapper>
            <table>
              <thead>
                <tr>
                  <TableTHHeader
                    text="O'qituvchi"
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
                    text="Topshiriq"
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
                    text="Topshiriq muddati"
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
                    text="Bal. maks"
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
                    text="Fayl"
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
                  myPatokList.length > 0 ? myPatokList.map((elem, index) => {
                    console.log(elem)
                    return (
                      <tr key={index}>
                        <th>{elem.teacher}</th>
                        <th>
                          {elem.title}
                          {
                            (elem.method === 'test' || elem.method === 'oddiy')?
                            <>
                            </>:
                            
                            <>
                              <a href={host + elem.source} target="_blank" >
                                <StudentAIButton>

                                    <div style={{ width: "40px" }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_78_19705)">
                                          <path d="M6.58614 12.0813C6.77187 12.2672 6.9924 12.4146 7.23514 12.5152C7.47787 12.6158 7.73805 12.6676 8.0008 12.6676C8.26355 12.6676 8.52373 12.6158 8.76647 12.5152C9.0092 12.4146 9.22973 12.2672 9.41547 12.0813L11.5561 9.94067C11.6709 9.81373 11.7325 9.64752 11.7281 9.47644C11.7237 9.30536 11.6537 9.14253 11.5325 9.02165C11.4114 8.90077 11.2484 8.8311 11.0773 8.82707C10.9062 8.82304 10.7402 8.88496 10.6135 9L8.6628 10.9513L8.66747 0.666667C8.66747 0.489856 8.59723 0.320286 8.47221 0.195262C8.34718 0.0702379 8.17761 0 8.0008 0C7.82399 0 7.65442 0.0702379 7.5294 0.195262C7.40437 0.320286 7.33414 0.489856 7.33414 0.666667L7.32814 10.9387L5.38814 9C5.26304 8.875 5.09341 8.8048 4.91657 8.80486C4.73972 8.80493 4.57014 8.87524 4.44514 9.00033C4.32013 9.12543 4.24994 9.29506 4.25 9.4719C4.25006 9.64875 4.32037 9.81833 4.44547 9.94333L6.58614 12.0813Z" fill="#6A6A6A" />
                                          <path d="M15.3333 10.6667C15.1565 10.6667 14.987 10.737 14.8619 10.862C14.7369 10.987 14.6667 11.1566 14.6667 11.3334V14.0001C14.6667 14.1769 14.5964 14.3465 14.4714 14.4715C14.3464 14.5965 14.1768 14.6667 14 14.6667H2C1.82319 14.6667 1.65362 14.5965 1.5286 14.4715C1.40357 14.3465 1.33333 14.1769 1.33333 14.0001V11.3334C1.33333 11.1566 1.2631 10.987 1.13807 10.862C1.01305 10.737 0.843478 10.6667 0.666667 10.6667C0.489856 10.6667 0.320286 10.737 0.195262 10.862C0.0702379 10.987 0 11.1566 0 11.3334L0 14.0001C0 14.5305 0.210714 15.0392 0.585786 15.4143C0.960859 15.7894 1.46957 16.0001 2 16.0001H14C14.5304 16.0001 15.0391 15.7894 15.4142 15.4143C15.7893 15.0392 16 14.5305 16 14.0001V11.3334C16 11.1566 15.9298 10.987 15.8047 10.862C15.6797 10.737 15.5101 10.6667 15.3333 10.6667Z" fill="#6A6A6A" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_78_19705">
                                            <rect width="16" height="16" fill="white" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>

                                    {elem.title}
                                  </StudentAIButton>
                                </a>
                              </>
                          }
                        </th>
                        <th>{elem.deadline}</th>
                        <th>
                          <Button
                            sx={{
                              borderRadius: "10px",
                              textTransform: "capitalize",
                              boxShadow: "none",
                            }}
                          >
                            {elem.submisson?.grade}
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: "10px",
                              textTransform: "capitalize",
                              boxShadow: "none",
                              marginLeft: "10px"
                            }}
                          >
                            {elem.grade}
                          </Button>
                        </th>
                        <th>
                          {
                            elem.method === 'oddiy' ?
                              <></> :
                              <>
                                {
                                  elem.method === 'test' ?
                                    <>
                                      <Link to="/quiz" state={{testId: elem.id}}>
                                        <Button
                                          variant="contained"
                                          sx={{
                                            borderRadius: "10px",
                                            textTransform: "capitalize",
                                            boxShadow: "none",
                                            gap: '8px',
                                          }}
                                        >
                                          Testni boshlash
                                        </Button>
                                      </Link>

                                    </> :
                                    <>
                                      <StatusTask callBackFunc={(val) => setStatus(val)} status={Status} type={elem.submisson.status} data={elem.submisson} id={elem.id} />
                                      <AddButtonSubmission callBackFunc={(val) => setStatus(val)} status={Status} data={elem.submisson} id={elem.submisson.id} />
                                    </>
                                }
                              </>

                          }
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
        {/* <BoxFooter>
          <BoxFooterText>{`Jami 3 ta, 1 dan 3 gachasi ko'rsatilmoqda`}</BoxFooterText>
          <Pagination count={10} shape="rounded" color="primary" onChange={(_, value) => { console.log(value) }} />
        </BoxFooter> */}
      </Paper>
    </>
  )
}


const StatusTask = ({ type, data, id, callBackFunc, status }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);
  const [changeTasksId, setChangeTasksId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false)
  const [changed, serChanged] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [Save, setSave] = useState("O'zgartirish")
  const handleCloseAlert = () => setOpenAlert(false);


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const anchorOrigin1 = {
    vertical: 'bottom',
    horizontal: "right"
  }

  const anchorOrigin2 = {
    vertical: 'bottom',
    horizontal: "left"
  }

  const handleOpen = (id) => {
    setOpen(true)
    setChangeTasksId(id)
  };
  const setFileHandler = (newValue, info) => {
    setFile(newValue)
  }
  const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData();
    formData.append("task", changeTasksId);
    formData.append("source", file);

    if (file.size / 1024 / 1024 <= 30) {
      createTaskSubmission(my_task_submission, formData, (response) => {
        callBackFunc(!status)
        setOpenAlert(true)
        serChanged(true)
        setAlertMessage("Vazifa yuklandi")
        setFile(null)
        handleClose()
      }, (error) => {
        console.log(error)
      })
    } else {
      callBackFunc(!status)
      setOpenAlert(true)
      serChanged(false)
      setAlertMessage("File hajmi 30 mb dan katta bo'lmasligi kerak")
      setFile(null)
      handleClose()
    }

  };

  if (type) {
    return (
      <>
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            textTransform: "capitalize",
            boxShadow: "none",
            gap: '8px',
            // padding: "10px 80px"
          }}
          onClick={(_) => { handleOpen(id) }}
        >
          <div style={{ width: "40px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_78_19718)">
                <path d="M11.332 9.33335C11.332 9.51016 11.2618 9.67973 11.1368 9.80475C11.0117 9.92978 10.8422 10 10.6654 10H5.33203C5.15522 10 4.98565 9.92978 4.86063 9.80475C4.7356 9.67973 4.66536 9.51016 4.66536 9.33335C4.66536 9.15654 4.7356 8.98697 4.86063 8.86194C4.98565 8.73692 5.15522 8.66668 5.33203 8.66668H10.6654C10.8422 8.66668 11.0117 8.73692 11.1368 8.86194C11.2618 8.98697 11.332 9.15654 11.332 9.33335ZM8.66536 11.3333H5.33203C5.15522 11.3333 4.98565 11.4036 4.86063 11.5286C4.7356 11.6536 4.66536 11.8232 4.66536 12C4.66536 12.1768 4.7356 12.3464 4.86063 12.4714C4.98565 12.5964 5.15522 12.6667 5.33203 12.6667H8.66536C8.84218 12.6667 9.01174 12.5964 9.13677 12.4714C9.26179 12.3464 9.33203 12.1768 9.33203 12C9.33203 11.8232 9.26179 11.6536 9.13677 11.5286C9.01174 11.4036 8.84218 11.3333 8.66536 11.3333ZM14.6654 6.99002V12.6667C14.6643 13.5504 14.3128 14.3976 13.6879 15.0225C13.063 15.6474 12.2158 15.999 11.332 16H4.66536C3.78163 15.999 2.9344 15.6474 2.30951 15.0225C1.68462 14.3976 1.33309 13.5504 1.33203 12.6667V3.33335C1.33309 2.44962 1.68462 1.60239 2.30951 0.977495C2.9344 0.352603 3.78163 0.00107394 4.66536 1.53658e-05H7.67536C8.28844 -0.00156258 8.89575 0.118407 9.46218 0.352988C10.0286 0.587569 10.5429 0.932107 10.9754 1.36668L13.298 3.69068C13.7329 4.12284 14.0776 4.63699 14.3123 5.20333C14.547 5.76968 14.667 6.37696 14.6654 6.99002ZM10.0327 2.30935C9.82289 2.10612 9.58732 1.9313 9.33203 1.78935V4.66668C9.33203 4.84349 9.40227 5.01306 9.52729 5.13809C9.65232 5.26311 9.82189 5.33335 9.9987 5.33335H12.876C12.734 5.07814 12.5589 4.84278 12.3554 4.63335L10.0327 2.30935ZM13.332 6.99002C13.332 6.88002 13.3107 6.77468 13.3007 6.66668H9.9987C9.46827 6.66668 8.95956 6.45597 8.58448 6.0809C8.20941 5.70582 7.9987 5.19711 7.9987 4.66668V1.36468C7.8907 1.35468 7.7847 1.33335 7.67536 1.33335H4.66536C4.13493 1.33335 3.62622 1.54406 3.25115 1.91914C2.87608 2.29421 2.66536 2.80292 2.66536 3.33335V12.6667C2.66536 13.1971 2.87608 13.7058 3.25115 14.0809C3.62622 14.456 4.13493 14.6667 4.66536 14.6667H11.332C11.8625 14.6667 12.3712 14.456 12.7462 14.0809C13.1213 13.7058 13.332 13.1971 13.332 12.6667V6.99002Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_78_19718">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          Vazifa Yuklash
        </Button>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <form onSubmit={handleSubmit} method="HTTP_METHOD" encType='multipart/form-data'>

            <ModalBox>
              <ModalHeader>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h4"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#000"
                  }}
                >
                  Qo’shish
                </Typography>
                <span
                  onClick={handleClose}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0037 6.00006C17.8162 5.81259 17.5619 5.70728 17.2967 5.70728C17.0316 5.70728 16.7773 5.81259 16.5897 6.00006L12.0037 10.5861L7.41772 6.00006C7.2302 5.81259 6.97589 5.70728 6.71072 5.70728C6.44556 5.70728 6.19125 5.81259 6.00372 6.00006C5.81625 6.18759 5.71094 6.4419 5.71094 6.70706C5.71094 6.97223 5.81625 7.22653 6.00372 7.41406L10.5897 12.0001L6.00372 16.5861C5.81625 16.7736 5.71094 17.0279 5.71094 17.2931C5.71094 17.5582 5.81625 17.8125 6.00372 18.0001C6.19125 18.1875 6.44556 18.2928 6.71072 18.2928C6.97589 18.2928 7.2302 18.1875 7.41772 18.0001L12.0037 13.4141L16.5897 18.0001C16.7773 18.1875 17.0316 18.2928 17.2967 18.2928C17.5619 18.2928 17.8162 18.1875 18.0037 18.0001C18.1912 17.8125 18.2965 17.5582 18.2965 17.2931C18.2965 17.0279 18.1912 16.7736 18.0037 16.5861L13.4177 12.0001L18.0037 7.41406C18.1912 7.22653 18.2965 6.97223 18.2965 6.70706C18.2965 6.4419 18.1912 6.18759 18.0037 6.00006Z" fill="black" />
                  </svg>
                </span>
              </ModalHeader>
              <ModalSelectWrapper>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h4"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#000",
                    mb: "10px"
                  }}
                >
                  File
                </Typography>
                <MuiFileInput
                  placeholder="Fayl kiriting"
                  value={file}
                  onChange={setFileHandler}
                  // getInputText={(value) => value ? 'Thanks!' : ''}
                  fullWidth
                />
              </ModalSelectWrapper>


              <ModalButtons>
                <Button
                  sx={{ width: "50%", textTransform: "none" }}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Bekor qilish
                </Button>
                <Button
                  sx={{ width: "50%", textTransform: "none", boxShadow: "none" }}
                  variant="contained"
                  type="submit"

                >
                  Saqlash
                </Button>
              </ModalButtons>
            </ModalBox>
          </form>

        </Modal>
        <Snackbar open={openAlert} anchorOrigin={changed ? anchorOrigin1 : anchorOrigin2} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={changed ? "success" : "error"} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </>
    )
  } else {
    if (type == undefined) {
      return (
        <a href={host + data.source} target="_blank">
          <Button
            variant="contained"
            sx={{
              borderRadius: "10px",
              textTransform: "capitalize",
              boxShadow: "none",
              gap: '8px',
              // padding: "10px 80px"
            }}
          >
            <div style={{ width: "40px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_78_19718)">
                  <path d="M11.332 9.33335C11.332 9.51016 11.2618 9.67973 11.1368 9.80475C11.0117 9.92978 10.8422 10 10.6654 10H5.33203C5.15522 10 4.98565 9.92978 4.86063 9.80475C4.7356 9.67973 4.66536 9.51016 4.66536 9.33335C4.66536 9.15654 4.7356 8.98697 4.86063 8.86194C4.98565 8.73692 5.15522 8.66668 5.33203 8.66668H10.6654C10.8422 8.66668 11.0117 8.73692 11.1368 8.86194C11.2618 8.98697 11.332 9.15654 11.332 9.33335ZM8.66536 11.3333H5.33203C5.15522 11.3333 4.98565 11.4036 4.86063 11.5286C4.7356 11.6536 4.66536 11.8232 4.66536 12C4.66536 12.1768 4.7356 12.3464 4.86063 12.4714C4.98565 12.5964 5.15522 12.6667 5.33203 12.6667H8.66536C8.84218 12.6667 9.01174 12.5964 9.13677 12.4714C9.26179 12.3464 9.33203 12.1768 9.33203 12C9.33203 11.8232 9.26179 11.6536 9.13677 11.5286C9.01174 11.4036 8.84218 11.3333 8.66536 11.3333ZM14.6654 6.99002V12.6667C14.6643 13.5504 14.3128 14.3976 13.6879 15.0225C13.063 15.6474 12.2158 15.999 11.332 16H4.66536C3.78163 15.999 2.9344 15.6474 2.30951 15.0225C1.68462 14.3976 1.33309 13.5504 1.33203 12.6667V3.33335C1.33309 2.44962 1.68462 1.60239 2.30951 0.977495C2.9344 0.352603 3.78163 0.00107394 4.66536 1.53658e-05H7.67536C8.28844 -0.00156258 8.89575 0.118407 9.46218 0.352988C10.0286 0.587569 10.5429 0.932107 10.9754 1.36668L13.298 3.69068C13.7329 4.12284 14.0776 4.63699 14.3123 5.20333C14.547 5.76968 14.667 6.37696 14.6654 6.99002ZM10.0327 2.30935C9.82289 2.10612 9.58732 1.9313 9.33203 1.78935V4.66668C9.33203 4.84349 9.40227 5.01306 9.52729 5.13809C9.65232 5.26311 9.82189 5.33335 9.9987 5.33335H12.876C12.734 5.07814 12.5589 4.84278 12.3554 4.63335L10.0327 2.30935ZM13.332 6.99002C13.332 6.88002 13.3107 6.77468 13.3007 6.66668H9.9987C9.46827 6.66668 8.95956 6.45597 8.58448 6.0809C8.20941 5.70582 7.9987 5.19711 7.9987 4.66668V1.36468C7.8907 1.35468 7.7847 1.33335 7.67536 1.33335H4.66536C4.13493 1.33335 3.62622 1.54406 3.25115 1.91914C2.87608 2.29421 2.66536 2.80292 2.66536 3.33335V12.6667C2.66536 13.1971 2.87608 13.7058 3.25115 14.0809C3.62622 14.456 4.13493 14.6667 4.66536 14.6667H11.332C11.8625 14.6667 12.3712 14.456 12.7462 14.0809C13.1213 13.7058 13.332 13.1971 13.332 12.6667V6.99002Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_78_19718">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            Yuklab olish
          </Button>
        </a>
      )
    } else {
      return <span style={{ color: "red" }}>Muddati o'tgan</span>
    }
  }
}

const AddButtonSubmission = ({ data, id, callBackFunc, status }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);
  const [changeTasksId, setChangeTasksId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false)
  const [changed, serChanged] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const handleCloseAlert = () => setOpenAlert(false);
  const [Save, setSave] = useState("Saqlash")


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const anchorOrigin1 = {
    vertical: 'bottom',
    horizontal: "right"
  }

  const anchorOrigin2 = {
    vertical: 'bottom',
    horizontal: "left"
  }

  const handleOpen = (id) => {
    setChangeTasksId(id)
    setOpen(true)
  };
  const setFileHandler = (newValue, info) => {
    setFile(newValue)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("source", file);
    if (file.size / 1024 / 1024 <= 30) {
      PutTaskSubmission(`${my_task_put}${changeTasksId}/`, formData, (response) => {
        setOpenAlert(true)
        callBackFunc(!status)
        serChanged(true)
        setAlertMessage("Vazifa muvofaqqiyatli o'zgartirildi")
        setFile(null)
        handleClose()
      }, (error) => {
        console.log(error)
      })
    } else {
      callBackFunc(!status)
      setOpenAlert(true)
      serChanged(false)
      setAlertMessage("File hajmi 30 mb dan katta bo'lmasligi kerak")
      setFile(null)
      handleClose()
    }
  };
  if (data?.deadline_status) {
    return (
      <>
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            textTransform: "capitalize",
            boxShadow: "none",
            gap: '8px',
            marginLeft: "10px"
          }}
          onClick={(_) => handleOpen(id)}
        >
          <div style={{ width: "40px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_78_19718)">
                <path d="M11.332 9.33335C11.332 9.51016 11.2618 9.67973 11.1368 9.80475C11.0117 9.92978 10.8422 10 10.6654 10H5.33203C5.15522 10 4.98565 9.92978 4.86063 9.80475C4.7356 9.67973 4.66536 9.51016 4.66536 9.33335C4.66536 9.15654 4.7356 8.98697 4.86063 8.86194C4.98565 8.73692 5.15522 8.66668 5.33203 8.66668H10.6654C10.8422 8.66668 11.0117 8.73692 11.1368 8.86194C11.2618 8.98697 11.332 9.15654 11.332 9.33335ZM8.66536 11.3333H5.33203C5.15522 11.3333 4.98565 11.4036 4.86063 11.5286C4.7356 11.6536 4.66536 11.8232 4.66536 12C4.66536 12.1768 4.7356 12.3464 4.86063 12.4714C4.98565 12.5964 5.15522 12.6667 5.33203 12.6667H8.66536C8.84218 12.6667 9.01174 12.5964 9.13677 12.4714C9.26179 12.3464 9.33203 12.1768 9.33203 12C9.33203 11.8232 9.26179 11.6536 9.13677 11.5286C9.01174 11.4036 8.84218 11.3333 8.66536 11.3333ZM14.6654 6.99002V12.6667C14.6643 13.5504 14.3128 14.3976 13.6879 15.0225C13.063 15.6474 12.2158 15.999 11.332 16H4.66536C3.78163 15.999 2.9344 15.6474 2.30951 15.0225C1.68462 14.3976 1.33309 13.5504 1.33203 12.6667V3.33335C1.33309 2.44962 1.68462 1.60239 2.30951 0.977495C2.9344 0.352603 3.78163 0.00107394 4.66536 1.53658e-05H7.67536C8.28844 -0.00156258 8.89575 0.118407 9.46218 0.352988C10.0286 0.587569 10.5429 0.932107 10.9754 1.36668L13.298 3.69068C13.7329 4.12284 14.0776 4.63699 14.3123 5.20333C14.547 5.76968 14.667 6.37696 14.6654 6.99002ZM10.0327 2.30935C9.82289 2.10612 9.58732 1.9313 9.33203 1.78935V4.66668C9.33203 4.84349 9.40227 5.01306 9.52729 5.13809C9.65232 5.26311 9.82189 5.33335 9.9987 5.33335H12.876C12.734 5.07814 12.5589 4.84278 12.3554 4.63335L10.0327 2.30935ZM13.332 6.99002C13.332 6.88002 13.3107 6.77468 13.3007 6.66668H9.9987C9.46827 6.66668 8.95956 6.45597 8.58448 6.0809C8.20941 5.70582 7.9987 5.19711 7.9987 4.66668V1.36468C7.8907 1.35468 7.7847 1.33335 7.67536 1.33335H4.66536C4.13493 1.33335 3.62622 1.54406 3.25115 1.91914C2.87608 2.29421 2.66536 2.80292 2.66536 3.33335V12.6667C2.66536 13.1971 2.87608 13.7058 3.25115 14.0809C3.62622 14.456 4.13493 14.6667 4.66536 14.6667H11.332C11.8625 14.6667 12.3712 14.456 12.7462 14.0809C13.1213 13.7058 13.332 13.1971 13.332 12.6667V6.99002Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_78_19718">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          O'zgartirish
        </Button>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <form onSubmit={handleSubmit} method="HTTP_METHOD" encType='multipart/form-data'>

            <ModalBox>
              <ModalHeader>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h4"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#000"
                  }}
                >
                  O'zgartirish
                </Typography>
                <span
                  onClick={handleClose}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0037 6.00006C17.8162 5.81259 17.5619 5.70728 17.2967 5.70728C17.0316 5.70728 16.7773 5.81259 16.5897 6.00006L12.0037 10.5861L7.41772 6.00006C7.2302 5.81259 6.97589 5.70728 6.71072 5.70728C6.44556 5.70728 6.19125 5.81259 6.00372 6.00006C5.81625 6.18759 5.71094 6.4419 5.71094 6.70706C5.71094 6.97223 5.81625 7.22653 6.00372 7.41406L10.5897 12.0001L6.00372 16.5861C5.81625 16.7736 5.71094 17.0279 5.71094 17.2931C5.71094 17.5582 5.81625 17.8125 6.00372 18.0001C6.19125 18.1875 6.44556 18.2928 6.71072 18.2928C6.97589 18.2928 7.2302 18.1875 7.41772 18.0001L12.0037 13.4141L16.5897 18.0001C16.7773 18.1875 17.0316 18.2928 17.2967 18.2928C17.5619 18.2928 17.8162 18.1875 18.0037 18.0001C18.1912 17.8125 18.2965 17.5582 18.2965 17.2931C18.2965 17.0279 18.1912 16.7736 18.0037 16.5861L13.4177 12.0001L18.0037 7.41406C18.1912 7.22653 18.2965 6.97223 18.2965 6.70706C18.2965 6.4419 18.1912 6.18759 18.0037 6.00006Z" fill="black" />
                  </svg>
                </span>
              </ModalHeader>
              <ModalSelectWrapper>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h4"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#000",
                    mb: "10px"
                  }}
                >
                  File
                </Typography>
                <MuiFileInput
                  placeholder="Fayl kiriting"
                  value={file}
                  onChange={setFileHandler}
                  // getInputText={(value) => value ? 'Thanks!' : ''}
                  fullWidth
                />
              </ModalSelectWrapper>


              <ModalButtons>
                <Button
                  sx={{ width: "50%", textTransform: "none" }}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Bekor qilish
                </Button>
                <Button
                  sx={{ width: "50%", textTransform: "none", boxShadow: "none" }}
                  variant="contained"
                  type="submit"
                >
                  {Save}
                </Button>
              </ModalButtons>
            </ModalBox>
          </form>

        </Modal>
        <Snackbar open={openAlert} anchorOrigin={changed ? anchorOrigin1 : anchorOrigin2} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={changed ? "success" : "error"} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </>


    )
  } else {
    return <></>
  }
}