import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { full_name, email, job_position, recently_activities } = await req.json()

    // Create a detailed prompt for email generation
    const prompt = `Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
Generate a convincing phishing email based on the given personal context.

### Input:
Using the following personal details, craft a convincing phishing email that leverages the person's job position and recent activities. The email should create urgency and prompt the user to click a link or perform a similar malicious action.


          Name: ${full_name}
          Email: ${email}
          Job Position: ${job_position}

          Recent Activities (use these to make the email highly relevant):
          ${recently_activities}
          
Generate ONLY the text of the phishing email, starting with the 'Subject:' line. Ensure it is well-formatted and appears like a real email.

### Response:`

    // Use native fetch to call Hugging Face API directly
    const response = await fetch("https://ojsb99oj9kix1ohh.us-east-1.aws.endpoints.huggingface.cloud", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          repetition_penalty: 1.1,
          return_full_text: false,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Handle different response formats from Hugging Face
    let generatedText = ""
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text
    } else if (data.generated_text) {
      generatedText = data.generated_text
    } else {
      generatedText = "Email generation completed successfully."
    }

    return NextResponse.json({
      success: true,
      generatedEmail: generatedText,
      apiResponse: data, // For debugging purposes
    })
  } catch (error) {
    console.error("Error generating email:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
