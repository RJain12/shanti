function response = gpt(prompt)
    % Define OpenAI API key
    
    url = 'https://api.openai.com/v1/chat/completions';
    headers = {'Content-Type', 'application/json', 'Authorization', ['Bearer ' openai_api_key]};
    
    data = struct(...
        'model', 'gpt-3.5-turbo', ...
        'messages', struct(...
            'role', {'system', 'user'}, ...
            'content', {'You are a professional therapist that succinctly responds to whatever a patient says, providing them guidance, positive encouragement, and advice.', prompt}...
        )...
    );
    
    headerFields = reshape(headers, 2, []).';compcompco
    
    options = weboptions('RequestMethod', 'post', 'HeaderFields', headerFields, 'Timeout', 30); % Adjust the timeout value as needed
    
    try
        response = webwrite(url, data, options);
        disp(response); % Display the response
    catch ME
        disp(ME.message); % Display the error message
        response = ME.message;
    end
