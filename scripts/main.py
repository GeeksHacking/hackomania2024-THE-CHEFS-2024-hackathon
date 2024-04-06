import psycopg2
import os
import click
import requests
import pandas as pd
from dotenv import load_dotenv
from job import Job

# Load env var from .env file
load_dotenv()

CONNECTION = os.getenv("CONNECTION")
API_URL = os.getenv("API_URL")
headers = {"Authorization": "Bearer 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"}


def query(payload):
    if API_URL is None:
        raise Exception("Env file not found")

    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


def save_database(rows: list[Job]):
    if CONNECTION is None:
        raise Exception("Env file not found")

    with psycopg2.connect(CONNECTION) as conn:
        cursor = conn.cursor()

        # use the cursor to interact with your database
        # cursor.execute("SELECT * FROM table")
        for row in rows:
            try:
                cursor.execute(
                    """
                    INSERT INTO bigdata_job (site, job_url, title, company, location, 
                    job_type, date_posted, interval, min_amount, max_amount, currency, 
                    is_remote, emails, description, academic_qualification, 
                    professional_qualification, years_of_experience, skills_required) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s);
                    """,
                    (
                        row.site,
                        row.job_url,
                        row.title,
                        row.company,
                        row.location,
                        row.job_type,
                        row.job_type,
                        row.date_posted,
                        row.interval,
                        row.min_amount,
                        row.max_amount,
                        row.currency,
                        row.is_remote,
                        row.emails,
                        row.description,
                        row.academic_qualification,
                        row.professional_qualification,
                        row.years_of_experience,
                        row.skills_required,
                    ),
                )
            except (Exception, psycopg2.Error) as error:
                print(error)
        conn.commit()
        conn.close()
    exit()


def parse(file):
    df = pd.read_csv(file)

    count = 0
    for _, row in df.iterrows():
        if count == 2:
            break
        job = Job(
            row["site"],
            row["job_url"],
            row["title"],
            row["company"],
            row["location"],
            row["job_type"],
            row["date_posted"],
            row["interval"],
            row["min_amount"],
            row["max_amount"],
            row["currency"],
            row["is_remote"],
            row["emails"],
            row["description"],
            "",
            "",
            0,
            "",
        )

        keywords = [
            "academic_qualification",
            "professional_qualification",
            "years_of_experience",
            "skills_required",
        ]

        jobs = []
        for keyword in keywords:
            prompt = """
            Pretend that you are a candidate searching for a job.
            Extract the {} from this job posting:
            """.format(
                keyword
            )

            print("========================================")
            print("Job description: " + job.description)
            print("Current keyword: " + keyword)

            output = query(
                {
                    "inputs": prompt + job.description,
                }
            )

            job[keyword] = output[0]["generated_text"]

            print(job[keyword])
        jobs.append(job)
        count += 1
    # save_database(jobs)


@click.command()
@click.argument("file", type=click.Path(exists=True))
def main(file):
    parse(file)

    exit(0)


if __name__ == "__main__":
    main()
