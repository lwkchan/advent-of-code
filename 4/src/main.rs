use std::fs;

const REQUIRED_FIELDS: [&str; 7] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

fn main() {
    let file_name = "src/input.txt";

    let file_data = fs::read_to_string(file_name).unwrap();

    let formatted_data = format_data(&file_data);

    // test the validity function
    assert_eq!(
        check_document_validity([("hello", "world")].to_vec()),
        false
    );
    assert_eq!(
        check_document_validity(
            [
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

    // number of valid passports
    let answer = find_answer_1(formatted_data);
    println!("{}", answer);
}

// In your batch file, how many passports are valid?
// where each Vector is a passport
// [[(key, value), (key, value)], [(key, value)]]
fn format_data(data: &String) -> Vec<Vec<(&str, &str)>> {
    let mut result: Vec<Vec<(&str, &str)>> = Vec::new();
    let mut current_document: Vec<(&str, &str)> = Vec::new();
    for (index, line) in data.lines().enumerate() {
        println!("{:?}", line);
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
        // if it's the last one, push it into the data
        if index == line.len() - 1 {
            result.push(current_document.clone()); // copy the value so that the reference tie is cut
        }
    }

    result
}

fn find_answer_1(data: Vec<Vec<(&str, &str)>>) -> i32 {
    let mut result = 0;
    for document in data {
        // all required fields are present in the keys
        let is_valid = check_document_validity(document);

        if is_valid {
            result += 1;
        }
    }

    result
}

fn check_document_validity(document: Vec<(&str, &str)>) -> bool {
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
