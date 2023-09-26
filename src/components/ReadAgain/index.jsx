import React, { useState } from 'react'
import { ContentWrapper, BoxHeader, ClassScheduleTableWrapper } from '../../global_styles/styles'
import { Button, Paper, Typography } from '@mui/material'
import { ReadAgainLeft, ReadAgainReight, ReadAgainReightSumma, ReadAgainWrapper } from './styles'
import { TableTHHeader } from '../DiplomaTable'
import { useSelector } from 'react-redux'
import languageList from './language.json'



export default function ReadAgain() {
  const language = useSelector(state => state.language)

  const [totalSumma, setTotalSumma] = useState(0)
  const [oneKredit, setOneKredit] = useState(375650)

  const summaTotal = (summa) => {
    setTotalSumma(totalSumma + summa)
  }

  const subtractionTotal = (summa) => {
    setTotalSumma(totalSumma - summa)
  }

  return (
    <ContentWrapper>
      <ReadAgainWrapper>
        <ReadAgainLeft>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            <ClassScheduleTableWrapper>
              <table>
                <thead>
                  <tr>
                    <TableTHHeader
                      text={languageList.Science[language]}
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
                      text={languageList.Credit[language]}
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <ReadAgainOneScience kredit={6} oneKreditSumma={oneKredit} addFunction={(val) => { summaTotal(val) }} subtractionFunction={(val) => { subtractionTotal(val) }} />
                  <ReadAgainOneScience kredit={6} oneKreditSumma={oneKredit} addFunction={(val) => { summaTotal(val) }} subtractionFunction={(val) => { subtractionTotal(val) }} />
                  <ReadAgainOneScience kredit={6} oneKreditSumma={oneKredit} addFunction={(val) => { summaTotal(val) }} subtractionFunction={(val) => { subtractionTotal(val) }} />
                  <ReadAgainOneScience kredit={6} oneKreditSumma={oneKredit} addFunction={(val) => { summaTotal(val) }} subtractionFunction={(val) => { subtractionTotal(val) }} />
                  <ReadAgainOneScience kredit={6} oneKreditSumma={oneKredit} addFunction={(val) => { summaTotal(val) }} subtractionFunction={(val) => { subtractionTotal(val) }} />
                  <ReadAgainOneScience kredit={6} oneKreditSumma={oneKredit} addFunction={(val) => { summaTotal(val) }} subtractionFunction={(val) => { subtractionTotal(val) }} />
                </tbody>
              </table>
            </ClassScheduleTableWrapper>
          </Paper>
        </ReadAgainLeft>
        <ReadAgainReight>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            <Typography
              sx={{
                color: "#6A6A6A",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "150%"
              }}
            >
              {languageList.Amount[language]} = {'7 091 940'} {languageList.Sum[language]} <br />
              1 {languageList.CreditLowerCase[language]} = {oneKredit} {languageList.Sum[language]}
            </Typography>
            <ReadAgainReightSumma>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "normal"
                }}
              >
                {languageList.Total[language]}:
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "normal"
                }}
              >
                {totalSumma} {languageList.Sum[language]}
              </Typography>
            </ReadAgainReightSumma>
            {
              totalSumma != 0 ?
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    boxShadow: "none",
                    width: "100%",
                    padding: "14px",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "normal",
                    marginTop: "32px"
                  }}
                >
                  {languageList.Payment[language]}
                </Button> : null
            }
          </Paper>
        </ReadAgainReight>
      </ReadAgainWrapper>
    </ContentWrapper>
  )
}

const ReadAgainOneScience = ({ kredit, oneKreditSumma, addFunction, subtractionFunction }) => {

  const [addButton, setAddButton] = useState(true)

  const language = useSelector(state => state.language)

  return (
    <tr>
      <th>Kompyuterni tashkillashtirish</th>
      <th>{kredit}</th>
      <th>
        {
          addButton ?
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
              onClick={() => { addFunction(oneKreditSumma * 6); setAddButton(false); }}
            >
              {languageList.Choose[language]}
            </Button> :
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                boxShadow: "none",
                width: "181px"
              }}
              onClick={() => { subtractionFunction(oneKreditSumma * 6); setAddButton(true); }}
            >
              {languageList.Cancel[language]}
            </Button>
        }
      </th>
    </tr>
  )
}