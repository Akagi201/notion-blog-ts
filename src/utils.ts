async function fetchAllNotionRecords() {
	console.log("fetching records");
	const api_key = NOTION_API_KEY;
	const database_id = NOTION_BLOG_DB;

	// Define request headers
	const headers = {
		Authorization: `Bearer ${api_key}`,
		"Notion-Version": "2021-08-16",
		"Content-Type": "application/json",
	};

	// Initialize records to store all results
	const records = [];

	let hasMore = true;
	let startCursor = null;

	while (hasMore) {
		const requestBody = {
			start_cursor: startCursor,
		};

		const response = await fetch(
			`https://api.notion.com/v1/databases/${database_id}/query`,
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify(requestBody),
			},
		);

		console.log(response);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		records.push(...data.results);

		hasMore = data.has_more;
		startCursor = data.next_cursor;
	}

	// Return all records
	return records;
}

fetchAllNotionRecords().then((records) => {
	console.log("records", records);
});
