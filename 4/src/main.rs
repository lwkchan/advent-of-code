use regex::Regex;
use std::fs;

const REQUIRED_FIELDS: [&str; 7] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

fn main() {
    let file_name = "src/input.txt";

    let file_data = fs::read_to_string(file_name).unwrap();

    let formatted_data = format_data(&file_data);

    // test the validity function
    assert_eq!(
        check_required_fields_present(&[("hello", "world")].to_vec()),
        false
    );
    assert_eq!(
        check_required_fields_present(
            &[
                ("ecl", "#329eb1"),
                ("cid", "178"),
                ("hgt", "192"),
                ("eyr", "2020"),
                ("iyr", "2012"),
                ("hcl", "#602927"),
                ("byr", "2028"),
                ("pid", "7175349420")
            ]
            .to_vec()
        ),
        true
    );
    assert_eq!(
        check_required_fields_present(
            &[
                ("iyr", "2020"),
                ("byr", "1968"),
                ("ecl", "gry"),
                ("eyr", "2030"),
                ("hcl", "#1976b0"),
                ("cid", "127"),
                ("pid", "701862616")
            ]
            .to_vec()
        ),
        false
    );

    // number of valid passports
    let answer = find_answer_1(formatted_data.clone());
    println!("{}", answer);

    let answer = find_answer_2(formatted_data.clone());
    println!("{}", answer);
}

// In your batch file, how many passports are valid?
// where each Vector is a passport
// [[(key, value), (key, value)], [(key, value)]]
fn format_data(data: &String) -> Vec<Vec<(&str, &str)>> {
    let mut result: Vec<Vec<(&str, &str)>> = Vec::new();
    let mut current_document: Vec<(&str, &str)> = Vec::new();
    let last_line_index = data.lines().count() - 1;
    for (index, line) in data.lines().enumerate() {
        // if it's the last one, push it into the data
        if line.len() == 0 {
            result.push(current_document.clone()); // copy the value so that the reference tie is cut
            current_document = Vec::new();
            continue;
        }

        let pairs = line.split_whitespace();

        for pair in pairs {
            let key_and_value: Vec<&str> = pair.split(":").collect();
            current_document.push((key_and_value[0], key_and_value[1]));
        }

        if index == last_line_index {
            result.push(current_document.clone()); // copy the value so that the reference tie is cut
            continue;
        }
    }

    result
}

fn find_answer_1(data: Vec<Vec<(&str, &str)>>) -> i32 {
    let mut result = 0;
    for document in data {
        // all required fields are present in the keys
        let is_valid = check_required_fields_present(&document);

        if is_valid {
            result += 1;
        }
    }

    result
}

fn find_answer_2(data: Vec<Vec<(&str, &str)>>) -> i32 {
    let mut result = 0;

    for document in data {
        // all required fields are present in the keys and all values match the validation
        let is_valid = check_required_fields_present(&document) && check_fields_valid(&document);

        if is_valid {
            result += 1;
        }
    }

    result
}

fn check_required_fields_present(document: &Vec<(&str, &str)>) -> bool {
    REQUIRED_FIELDS.iter().all(|&required_field_name| {
        let current_field_name_present = document
            .iter()
            .find(|&&(key, _)| key == required_field_name);
        match current_field_name_present {
            Some(_) => true,
            None => false,
        }
    })
}

fn check_fields_valid(document: &Vec<(&str, &str)>) -> bool {
    let mut is_all_fields_valid: bool = true;

    for (key, value) in document {
        match key.as_ref() {
            "byr" => {
                if is_year_in_range(value, 1920, 2002) {
                    continue;
                }
                is_all_fields_valid = false;
            }
            "iyr" => {
                if is_year_in_range(value, 2010, 2020) {
                    continue;
                }
                is_all_fields_valid = false;
            }
            "eyr" => {
                if is_year_in_range(value, 2020, 2030) {
                    continue;
                }
                is_all_fields_valid = false;
            }
            "hgt" => {
                if value.contains("cm") {
                    // If cm, the number must be at least 150 and at most 193.
                    let number: i32 = value.rsplit("cm").collect::<Vec<&str>>()[1]
                        .parse::<i32>()
                        .unwrap();

                    if number < 150 || number > 193 {
                        is_all_fields_valid = false;
                    }
                    continue;
                } else if value.contains("in") {
                    // If in, the number must be at least 59 and at most 76.
                    let number: i32 = value.rsplit("in").collect::<Vec<&str>>()[1]
                        .parse::<i32>()
                        .unwrap();

                    if number < 59 || number > 76 {
                        is_all_fields_valid = false;
                    }
                    continue;
                }
            }
            "hcl" => {
                let valid_pattern = Regex::new("#[0-9a-f]{6}$").unwrap();
                if valid_pattern.is_match(value) {
                    continue;
                }
                is_all_fields_valid = false;
            }
            "ecl" => {
                let valid_eye_colors = ["ecl", "amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                if valid_eye_colors.contains(&value) {
                    continue;
                }
                is_all_fields_valid = false;
            }
            "pid" => {
                let valid_pattern = Regex::new("[0-9]{9}$").unwrap();
                if valid_pattern.is_match(value) {
                    continue;
                }
                is_all_fields_valid = false;
            }
            _ => {} // do nothing
        }

        // already false so don't continue checking
        if is_all_fields_valid == false {
            break;
        }
    }

    is_all_fields_valid
}

fn is_year_in_range(value: &str, lower: i32, upper: i32) -> bool {
    if value.len() != 4 {
        return false;
    }
    let parsed_year = value.parse::<i32>().unwrap();
    if parsed_year < lower || parsed_year > upper {
        return false;
    }
    true
}
