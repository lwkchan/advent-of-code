use std::fs;

// How many passwords are valid according to their policies?

// A line looks like, where [policy]: [password]
// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc

// Password policy indicates the lost and highest number
// of times a given letter must appear for a password to
// be valid.  For example, 1-3 a means that the password
// must contain a at least 1 time and at most 3 times.

fn main() {
    let file_name = "src/input.txt";

    let file_data = fs::read_to_string(file_name).unwrap();

    // Vec(lower limit, upper limit, character, password)
    let combinations: Vec<(i32, i32, char, &str)> = file_data
        .lines()
        .map(|file_data_line| {
            // "2-9 c: ccccccccc" -> (2, 9, 'c', "ccccccccc")

            let a: Vec<&str> = file_data_line.split_whitespace().collect();

            // where [lower, upper]
            let limits: Vec<i32> = a[0]
                .split("-")
                .map(|limits_string| limits_string.parse::<i32>().expect("parse error"))
                .collect();

            let character: char = a[1].chars().collect::<Vec<char>>()[0];

            let password = a[2];

            (limits[0], limits[1], character, password)
        })
        .collect();

    let answer = find_answer_1(combinations.clone());
    println!("The number of valid passwords is: {}", answer);

    let answer = find_answer_2(combinations.clone());
    println!("The number of valid passwords is: {}", answer);
}

fn find_answer_1(combinations: Vec<(i32, i32, char, &str)>) -> i32 {
    let mut result = 0;

    for combination in combinations {
        let (lower_limit, upper_limit, character, password) = combination;
        let character_count = password.matches(character).count();

        if character_count <= (upper_limit as usize) && character_count >= (lower_limit as usize) {
            result += 1;
        }
    }

    result
}

fn find_answer_2(combinations: Vec<(i32, i32, char, &str)>) -> i32 {
    let mut result = 0;

    for combination in combinations {
        let (first_position, second_position, expected_character, password) = combination;
        let first_char: char = password.chars().nth((first_position as usize) - 1).unwrap();
        let second_char: char = password
            .chars()
            .nth((second_position as usize) - 1)
            .unwrap();

        println!(
            "{:?}",
            (
                first_position,
                first_char,
                second_position,
                second_char,
                expected_character,
                password
            )
        );

        if first_char == expected_character && second_char != expected_character {
            result += 1;
        }
        if first_char != expected_character && second_char == expected_character {
            result += 1;
        }
    }

    result
}
