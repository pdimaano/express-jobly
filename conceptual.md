refactoring to do
esp concerning middleware --> move ALL author. to middleware


clean up TODO's mostly they are about ADDING TESTS


Part Four Jobs

table preexisting. study it.

why do they do NUMERIC field type? it must be because it has perfect precision
    and because probably it's more salary. so its good for consistent formatting? or somerthing. to two dec imal places.


IMPLEMENTING JOBS
    write the model
    model unit-tests
    write the routes
    route integration tests

THEN add filtering! similar to companies.

IMPLEMENTING JOB APPLICATIONS
    ...

TODO LIST
1. refactor with all authorization in middleware --- DONE
2. rewrite tests for auth.js middleware --- DONE
3. rewrite tests for users.test.js --- DONE
4. rewrite tests for companies.test.js --- DONE
5. Sanitize inputs to avoid crashing PostgresQL --- NOT DONE

theNNN

move on...

to PART 4. electric boogaloo.

jobs reference company_handle

applications reference job_id and user_username

query NUMERIC type --> postgres returns STRING! this is to remind you of its perfect precision to the relevant decimal place!
don't let it get into a non-NUMERIC type when put into some other language

