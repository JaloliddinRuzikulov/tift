import React, { useEffect } from 'react'
import { ClassScheduleTableWrapper, ContentWrapper } from '../../global_styles/styles'
import { PersonalPlanPaper, PersonalPlanWrapper } from './styles'
import { Paper, Typography } from '@mui/material'
import { TableTHHeader } from '../DiplomaTable'
import { rating_notebook } from '../../utils/API_urls'
import { getStudentRatingNotebook } from './requests'

export default function PersonalPlan() {
    useEffect(() => {
        getStudentRatingNotebook(rating_notebook, (response) => {
            console.log(response);
            // setInfoList(response.data.result)
        }, (error) => {
            console.log(error)
        })
    }, [])
    return (
        <ContentWrapper>
            <PersonalPlanWrapper>
                <Semester title="I-semestr"/>
                <Semester title="II-semestr"/>
                <Semester title="III-semestr"/>
                <Semester title="IV-semestr"/>
            </PersonalPlanWrapper>
        </ContentWrapper>
    )
}

const Semester = ({ title }) => {
    return (
        <PersonalPlanPaper elevation={0} sx={{borderRadius: "10px"}}>
            <Typography
                sx={{
                    color: "#000000",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "normal",
                    mb: "16px"
                }}
            >
               { title }
            </Typography>
            <ClassScheduleTableWrapper>
                <table>
                    <thead>
                        <tr>
                            <TableTHHeader
                                text="Fan"
                                iconc={null}
                            />
                            <TableTHHeader
                                text="Kredit"
                                iconc={null}
                            />
                            <TableTHHeader
                                text="Olingan baho"
                                iconc={null}
                            />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Fizika I</th>
                            <th>6</th>
                            <th>4</th>
                        </tr>
                        <tr>
                            <th>Hisob (Calculus)</th>
                            <th>8</th>
                            <th>4</th>
                        </tr>
                        <tr>
                            <th>Dasturlash I</th>
                            <th>6</th>
                            <th>4</th>
                        </tr>
                        <tr>
                            <th>Ingliz tili I</th>
                            <th>4</th>
                            <th>4</th>
                        </tr>
                        <tr>
                            <th>O'zbekiston tarixi I</th>
                            <th>4</th>
                            <th>4</th>
                        </tr>
                        <tr>
                            <th>Jismoniy tarbiya</th>
                            <th>0</th>
                            <th>4</th>
                        </tr>
                    </tbody>
                </table>
            </ClassScheduleTableWrapper>
        </PersonalPlanPaper>
    )
}
